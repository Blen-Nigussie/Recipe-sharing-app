import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch recipe details when page loads
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`https://enbla-recipe-sharing-app-16il.onrender.com/api/recipes/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setIngredients(data.ingredients.length ? data.ingredients : [""]);
        setSteps(data.steps.length ? data.steps : [""]);
      } catch (err) {
        setError("⚠️ Failed to load recipe.");
      }
    };
    fetchRecipe();
  }, [id]);

  // Update Recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.put(`https://recipe-sharing-app-fj75.onrender.com/api/recipes/${id}`, {
        title,
        description,
        ingredients,
        steps,
      });
      setSuccess("✅ Recipe updated successfully!");
      setTimeout(() => navigate("/my-recipes"), 1500);
    } catch (err) {
      setError("❌ Failed to update recipe.");
    }
  };

  // Add ingredient
  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleIngredientChange = (value, index) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  // Add step
  const handleAddStep = () => setSteps([...steps, ""]);
  const handleStepChange = (value, index) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>✏️ Edit Recipe</h2>

      {success && <div style={styles.successBox}>{success}</div>}
      {error && <div style={styles.errorBox}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Title */}
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        {/* Ingredients */}
        <h4 style={styles.sectionTitle}> Ingredients</h4>
        {ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            placeholder={`Ingredient ${index + 1}`}
            onChange={(e) => handleIngredientChange(e.target.value, index)}
            style={styles.input}
          />
        ))}
        <button type="button" onClick={handleAddIngredient} style={styles.addButton}>
          ➕ Add Ingredient
        </button>

        {/* Steps */}
        <h4 style={styles.sectionTitle}> Steps</h4>
        {steps.map((step, index) => (
          <textarea
            key={index}
            value={step}
            placeholder={`Step ${index + 1}`}
            onChange={(e) => handleStepChange(e.target.value, index)}
            style={styles.textarea}
          />
        ))}
        <button type="button" onClick={handleAddStep} style={styles.addButton}>
          ➕ Add Step
        </button>

        {/* Save button */}
        <button type="submit" style={styles.submitBtn}>
           Save Changes
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    padding: "30px 40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    borderRadius: 12,
  },
  heading: {
    textAlign: "center",
    color: "#4b9e22",
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 25,
    letterSpacing: 1,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  input: {
    padding: "12px 14px",
    borderRadius: 8,
    border: "1.5px solid #cbd5e1",
    fontSize: 16,
    transition: "border-color 0.3s",
    outline: "none",
  },
  textarea: {
    padding: "12px 14px",
    borderRadius: 8,
    border: "1.5px solid #cbd5e1",
    fontSize: 16,
    minHeight: 90,
    resize: "vertical",
    transition: "border-color 0.3s",
    outline: "none",
  },
  addButton: {
    alignSelf: "flex-start",
    backgroundColor: "#e2f4db",
    color: "#4b9e22",
    border: "none",
    padding: "8px 14px",
    fontWeight: "600",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: 4,
  },
  submitBtn: {
    marginTop: 30,
    backgroundColor: "#4b9e22",
    color: "white",
    padding: "14px 0",
    borderRadius: 10,
    fontWeight: "700",
    fontSize: 18,
    cursor: "pointer",
    border: "none",
    boxShadow: "0 4px 12px rgba(75, 158, 34, 0.6)",
    transition: "background-color 0.3s",
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#355e1b",
    marginBottom: 8,
    marginTop: 16,
    fontSize: 18,
  },
  successBox: {
    background: "#d1fae5",
    color: "#065f46",
    padding: "12px 16px",
    borderRadius: 8,
    marginBottom: 16,
    fontWeight: "600",
  },
  errorBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px 16px",
    borderRadius: 8,
    marginBottom: 16,
    fontWeight: "600",
  },
};
