async function response(userInput) {
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput })
    });

    const data = await response.json();

    console.log(data.chat_response);
    // Display 'data.chat_response' in your chat interface
}