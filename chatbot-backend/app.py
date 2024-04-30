from flask import Flask, jsonify, request
import hashlib
from flask_cors import CORS
import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import load_model
import requests

app = Flask(__name__)
CORS(app)


# Load chatbot model and intents
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

    if 'weather in' in message.lower():
        location = message.split('weather in ')[-1]
        response_text = get_weather_data(location)
        return jsonify({'response': response_text})

    ints = predict_class(message)
    print("Predicted Intents:", ints)  # Debug print to see the predicted intents

    res = get_response(ints, intents)
    print("Selected Response:", res)  # Debug print to see the selected response

    return jsonify({'response': res})


def get_weather_data(city):
    api_key = '30d4741c779ba94c470ca1f63045390a'
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid={api_key}"
    response = requests.get(url)
    
    if response.status_code == 200:
        weather_data = response.json()
        weather = weather_data['weather'][0]['main']
        temp = round(weather_data['main']['temp'])
        return f"The weather in {city} is: {weather}, Temperature: {temp}ºF"
    elif response.status_code == 404:
        return "No City Found"
    else:
        return "Weather data not available at the moment."


# db = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="Lydia@11",
#     database="chatbot"
# )
# cursor = db.cursor()

# @app.route('/', methods=['GET'])
# def home():
#     return "Flask Server is Running!"

# @app.route('/api/signup', methods=['POST'])
# def signup():
#     data = request.json  # Get JSON data from the request
#     email = data.get('email')
#     password = data.get('password')

#     # Hash the password for security
#     hashed_password = hashlib.sha256(password.encode()).hexdigest()

#     # Insert user into the database
#     try:
#         cursor.execute("INSERT INTO users (email, password_hash) VALUES (%s, %s)", (email, hashed_password))
#         db.commit()
#         response = {"message": "Sign-up successful"}
#     except mysql.connector.Error as err:
#         db.rollback()
#         response = {"error": f"Error: {err}"}

#     return jsonify(response)




if __name__ == '__main__':
    app.run(debug=True)





