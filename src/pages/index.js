import { useEffect, useState } from "react";
import styled from "styled-components";

const HomePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [pairings, setPairings] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    imageUrl: "",
    flavor: [],
    description: "",
  });
  const [newPairing, setNewPairing] = useState({
    ingredients: [],
    reason: "",
  });

  useEffect(() => {
    // Fetch ingredients from API
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((data) => setIngredients(data.ingredients))
      .catch((error) => console.error("Error fetching ingredients:", error));

    // Fetch pairings from API
    fetch("/api/pairings")
      .then((res) => res.json())
      .then((data) => setPairings(data.pairings))
      .catch((error) => console.error("Error fetching pairings:", error));
  }, []);

  // Handle new ingredient input changes
  const handleNewIngredientChange = (e) => {
    setNewIngredient({ ...newIngredient, [e.target.name]: e.target.value });
  };

  // Handle new pairing input changes
  const handleNewPairingChange = (e) => {
    setNewPairing({ ...newPairing, [e.target.name]: e.target.value });
  };

  // Handle new ingredient creation
  const handleCreateIngredient = () => {
    fetch("/api/ingredients/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIngredient),
    })
      .then((res) => res.json())
      .then((data) => {
        setIngredients([...ingredients, data]);
        setNewIngredient({
          name: "",
          imageUrl: "",
          flavor: [],
          description: "",
        });
      })
      .catch((error) => console.error("Error creating ingredient:", error));
  };

  // Handle new pairing creation
  const handleCreatePairing = () => {
    fetch("/api/pairings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPairing),
    })
      .then((res) => res.json())
      .then((data) => {
        setPairings([...pairings, data]);
        setNewPairing({ ingredients: [], reason: "" });
      })
      .catch((error) => console.error("Error creating pairing:", error));
  };

  return (
    <Container>
      <Section>
        <h2>Ingredients</h2>
        <IngredientList>
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.id || ingredient._id}>
              <h3>{ingredient.name}</h3>
              <p>{ingredient.description}</p>
              <Flavors>
                {ingredient.flavor.map((flavor, index) => (
                  <span key={index}>{flavor}</span>
                ))}
              </Flavors>
            </IngredientCard>
          ))}
        </IngredientList>

        {/* Form to add new ingredient */}
        <h3>Add New Ingredient</h3>
        <Form>
          <input
            type="text"
            name="name"
            value={newIngredient.name}
            onChange={handleNewIngredientChange}
            placeholder="Ingredient Name"
          />
          <input
            type="text"
            name="imageUrl"
            value={newIngredient.imageUrl}
            onChange={handleNewIngredientChange}
            placeholder="Image URL"
          />
          <input
            type="text"
            name="flavor"
            value={newIngredient.flavor.join(", ")}
            onChange={(e) =>
              setNewIngredient({
                ...newIngredient,
                flavor: e.target.value.split(", "),
              })
            }
            placeholder="Flavors (comma separated)"
          />
          <textarea
            name="description"
            value={newIngredient.description}
            onChange={handleNewIngredientChange}
            placeholder="Description"
          />
          <button type="button" onClick={handleCreateIngredient}>
            Add Ingredient
          </button>
        </Form>
      </Section>

      <Section>
        <h2>Pairings</h2>
        <PairingList>
          {pairings.map((pairing) => (
            <PairingCard key={pairing._id}>
              <h3>Pairing</h3>
              <p>{pairing.reason}</p>
              <ul>
                {/* Ensure pairing.ingredients is an array before mapping */}
                {(pairing.ingredients || []).map((ingredient) => (
                  <li key={ingredient._id}>
                    {ingredient.name}
                  </li> /* Add a key for each ingredient */
                ))}
              </ul>
            </PairingCard>
          ))}
        </PairingList>

        {/* Form to add new pairing */}
        <h3>Add New Pairing</h3>
        <Form>
          <input
            type="text"
            name="ingredients"
            value={newPairing.ingredients.join(", ")}
            onChange={(e) =>
              setNewPairing({
                ...newPairing,
                ingredients: e.target.value.split(", "),
              })
            }
            placeholder="Ingredient IDs (comma separated)"
          />
          <textarea
            name="reason"
            value={newPairing.reason}
            onChange={handleNewPairingChange}
            placeholder="Reason for Pairing"
          />
          <button type="button" onClick={handleCreatePairing}>
            Add Pairing
          </button>
        </Form>
      </Section>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const IngredientList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const IngredientCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  width: 200px;
`;

const Flavors = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;

  span {
    background-color: #f5f5f5;
    padding: 5px;
    border-radius: 4px;
  }
`;

const PairingList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PairingCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  width: 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  input,
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export default HomePage;
