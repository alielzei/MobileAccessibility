from flask import Flask, request, json
import openai

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    openai.api_key = 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
        
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Translate this English text to French: '{text}'"},
        ]
    )

    chat_response = response['choices'][0]['message']['content']
    return json.jsonify(chat_response=chat_response)

if __name__ == '__main__':
    app.run(debug=True)