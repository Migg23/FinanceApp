import { useState } from "react";

function RecipeSearch() {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    const ingredients = input.split(",").map(item => item.trim());

    const response = await fetch("/user/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();
    setRecipes(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ingredients: e.g. chicken, cheese"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search Recipes</button>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
}
export default RecipeSearch;