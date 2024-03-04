from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import load_model

app = Flask(__name__)
CORS(app)

lemmatizer = WordNetLemmatizer()
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbot_model.h5')

def load_intents(file_path):
    with open(file_path, 'r') as file:
        intents_data = json.load(file)
    return intents_data

intents = load_intents('intents_update.json')

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    return return_list

def get_response(intents_list, intents_json):
    if intents_list:
        tag = intents_list[0]['intent']
    else:
        tag = 'unknown'
    
    print("Detected Tag:", tag)  # Debug print statement

    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            print("Matched Intent:", i['tag'])  # Debug print statement
            response = random.choice(i['responses'])
            print("Selected Response:", response)  # Debug print statement
            return response
    return "I'm sorry, I didn't understand that."

CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})

@app.route('/', methods=['GET'])
def home():
    return "Flask Server is Running!"


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    print("Received Message:", message)  # Debug print to see the received message

    if message.lower() == 'reload':
        global intents
        intents = load_intents('intents.json')
        return jsonify({'response': 'Intents reloaded.'})

    if message.lower() == 'quit':
        return jsonify({'response': 'Goodbye!'})

    ints = predict_class(message)
    print("Predicted Intents:", ints)  # Debug print to see the predicted intents

    res = get_response(ints, intents)
    print("Selected Response:", res)  # Debug print to see the selected response

    return jsonify({'response': res})


if __name__ == '__main__':
    app.run(debug=True)
