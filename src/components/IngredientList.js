import { useEffect, useState } from "react";

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((data) => setIngredients(data));
  }, []);

  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;
