import React, { useState, useEffect } from "react";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('any');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [fullRecipe, setFullRecipe] = useState('');
    const [displayedRecipe, setDisplayedRecipe] = useState('');
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);

    const createRecipe = async () => {
        setLoading(true);
        setDisplayedRecipe('');
        setFullRecipe('');
        setTyping(false);

        try {
            const response = await fetch(`http://localhost:3000/recipe-creator?ingredients=${ingredients}&dietaryRestrictions=${dietaryRestrictions}&cuisine=${cuisine}`);
            const data = await response.text();
            setFullRecipe(data);
            setTyping(true);
        } catch (error) {
            console.error("Error generating recipe:", error);
            setFullRecipe("Something went wrong. Please try again.");
            setTyping(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typing && fullRecipe) {
            let index = 0;
            const typeChar = () => {
                if (index < fullRecipe.length) {
                    setDisplayedRecipe(prev => prev + fullRecipe.charAt(index));
                    index++;
                    setTimeout(typeChar, 20);
                } else {
                    setTyping(false);
                }
            };
            typeChar();
        }
    }, [typing, fullRecipe]);

    return (
        <div>
            <h2>Create a Recipe</h2>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter Ingredients (comma separated)"
            />
            <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Enter cuisine type"
            />
            <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Enter dietary restrictions"
            />
            <button onClick={createRecipe} disabled={loading}>
                {loading ? 'Generating...' : 'Create Recipe'}
            </button>

            {loading && (
                <div className="dot-loader-container" title="Generating recipe...">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                </div>
            )}

            {!loading && (
                <div className="output typing-output">
                    <p>{'\u200B'}{displayedRecipe}</p>
                </div>
            )}
        </div>
    );
}

export default RecipeGenerator;
