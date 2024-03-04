import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import load_model

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
    # tag = intents_list[0]['intent']
    if intents_list:
        tag = intents_list[0]['intent']
    else:
        print("error")
    # Handle the case when intents_list is empty
    # For example, print an error message or return a default value

    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            return random.choice(i['responses'])
    return "I'm sorry, I didn't understand that."

print("GO! Bot is running!")

while True:
    message = input("You: ")
    if message.lower() == 'reload':
        intents = load_intents('intents_update.json')
        print("Intents reloaded.")
        continue
    if message.lower() == 'quit':
        break
    ints = predict_class(message)
    res = get_response(ints, intents)
    print("Bot:", res)

