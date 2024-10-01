import { useState } from "react";

const AddIngredient = () => {
  const [name, setName] = useState("");
  const [flavorProfile, setFlavorProfile] = useState("");
  const [description, setDescription] = useState("");

  const addIngredient = async () => {
    const res = await fetch("/api/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, flavorProfile, description }),
    });
    if (res.ok) {
      alert("Ingredient added!");
    }
  };

  return (
    <div>
      <h2>Add Ingredient</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingredient Name"
      />
      <input
        type="text"
        value={flavorProfile}
        onChange={(e) => setFlavorProfile(e.target.value)}
        placeholder="Flavor Profile"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={addIngredient}>Add Ingredient</button>
    </div>
  );
};

export default AddIngredient;
