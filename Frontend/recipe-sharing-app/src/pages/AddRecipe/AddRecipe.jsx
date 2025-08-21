import React, { useState } from "react";
import axios from "axios";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleAddStep = () => setSteps([...steps, ""]);

  const handleIngredientChange = (value, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (value, index) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("ingredients", ingredients.join(","));
    formData.append("steps", steps.join("\n"));

    try {
      const res = await axios.post("https://recipe-sharing-app-fj75.onrender.com/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess("Recipe added successfully!");
      console.log(res.data);

      // Optionally reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setIngredients([""]);
      setSteps([""]);
      setImage(null);
    } catch (err) {
      console.error(err);
      setError(" Failed to add recipe. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🍽️ Add New Recipe</h2>
      {success && (
        <div style={styles.successBox}>{success}</div>
      )}
      {error && (
        <div style={styles.errorBox}>{error}</div>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />

        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <input
          type="text"
          placeholder="Category (e.g. Dessert, Main Course)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={styles.input}
        />

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

        <h4 style={styles.sectionTitle}>📷 Upload Image</h4>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} style={styles.fileInput} />

        <button type="submit" style={styles.submitBtn}>Submit Recipe</button>
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
  fileInput: {
    padding: "6px 14px",
    borderRadius: 8,
    border: "1.5px solid #cbd5e1",
    fontSize: 14,
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
