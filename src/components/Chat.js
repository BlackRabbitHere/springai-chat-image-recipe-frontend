import React, { useState, useEffect } from "react";

function Chat() {
    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);

    const askAI = async () => {
        setLoading(true);
        setTyping(false);
        setChatResponse('');
        setDisplayedText('');
        try {
            const response = await fetch(`http://localhost:3000/ask-ai?prompt=${prompt}`);
            const data = await response.text();
            console.log(data);
            setChatResponse(data);
            setTyping(true);
        } catch (error) {
            console.error("Error generating response:", error);
            setChatResponse("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Typing effect logic
    useEffect(() => {
    if (typing && chatResponse) {
        let index = 0;
        setDisplayedText(''); // Reset display

        const typeChar = () => {
            if (index < chatResponse.length) {
                const currentChar = chatResponse.charAt(index);
                setDisplayedText(prev => prev + currentChar);
                index++;
                setTimeout(typeChar, 20); // Typing delay
            } else {
                setTyping(false);
            }
        };

        typeChar(); // Start the typing loop
    }
}, [typing, chatResponse]);


    return (
        <div>
            <h2>Talk to AI</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt for AI"
            />
            <button onClick={askAI} disabled={loading}>
                {loading ? 'Thinking...' : 'Ask AI'}
            </button>

            {loading && (
                <div className="dot-loader-container" title="AI is thinking...">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                </div>
            )}

            {!loading && (
                <div className="output typing-output">
                    <p>{displayedText}</p>

                </div>
            )}
        </div>
    );
}

export default Chat;
