from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from config import OPENAI_API_KEY
from openai import OpenAI
import json

app = Flask(__name__)
CORS(app)
 
OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions'

@app.route('/generate-recommendations', methods=['POST'])
def generate_recommendations():
    try:
        # Get data from the frontend request
        data = request.get_json()
        # Extract the relevant information for the OpenAI API call
        input_categories = data.get('input_categories', [])
        print("Input Categories:", input_categories) #debugging
        input_categories_str = ', '.join(input_categories)
        prompt = f"Give guidelines for improving mobile app accessibility for each category: {input_categories_str}"

        response = requests.post(
            OPENAI_API_ENDPOINT,
            headers={'Authorization': f'Bearer {OPENAI_API_KEY}'},
            json={
                'prompt':prompt,
                'temperature':0.5,
                'max_tokens':150
            }
        )
        print(response.json())
        generated_text = response.json()['choices'][0]['text']
        return jsonify({'generated_text': generated_text})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
 
if __name__ == '__main__':
    app.run(port=5000,debug=True)