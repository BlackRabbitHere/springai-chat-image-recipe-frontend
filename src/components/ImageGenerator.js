import React, { useState } from "react";

function ImageGenerator(){
    const [prompt, setPrompt] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false); //  Added loading state

    const generateImage = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`http://localhost:3000/generate-image?prompt=${prompt}`);
            const urls = await response.json();
            setImageUrls(urls);
        } catch (error) {
            console.error("Error generating image : ", error);
        } finally {
            setLoading(false); // ✅ Stop loading
        }
    }

    return(
        <div className="tab-content">
            <h2>Generate Image</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e)=>setPrompt(e.target.value)}
                placeholder="Enter prompt for image"/>
            <button onClick={generateImage} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Image'}
            </button>

            {loading && (
                <div className="dot-loader-container" title="Generating image...">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                </div>
            )}

            <div className="image-grid">
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Generated ${index}`}></img>
                ))}
                {[...Array(4 - imageUrls.length)].map((_, index) => (
                    <div key={index + imageUrls.length}
                        className="empty-image-slot"></div>
                ))}
            </div>
        </div>
    )
}

export default ImageGenerator;
