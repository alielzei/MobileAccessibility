from flask import Flask, request, json, render_template
import flask_cors
import openai

app = Flask(__name__)
flask_cors.CORS(app)  # Enable CORS for all routes
@app.route('/')
def index():
    return render_template('final_score.html')
@app.route('/generate_recommendation', methods=['POST'])
def generate_recommendation():
    data = request.json
    unchecked_list = data.get("uncheckedItems", [])
    openai.api_key = "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"  # Replace with your OpenAI API key

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Generate recommendations based on unchecked items: {unchecked_list}"},
        ]
    )
    chat_response = response['choices'][0]['message']['content']
    return json.jsonify(chat_response=chat_response)
if __name__ == '__main__':
    app.run(debug=True)
'''@app.route('/generate_recommendation', methods=['POST'])
def chat():
    data = request.json
    unchecked_list = data.get("unchecked", [])
    openai.api_key = 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
        
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Generate recommendations based on unchecked items: {unchecked_list}"},
        ]
    )

    chat_response = response['choices'][0]['message']['content']
    return json.jsonify(chat_response=chat_response)
    pass

if __name__ == '__main__':
    app.run(debug=True) '''