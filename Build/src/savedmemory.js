import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";

const App = () => {
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState({
    title: "",
    description: "",
    date: "",
    imgSrc: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  // Load memories from localStorage when the app starts
  useEffect(() => {
    const savedMemories = JSON.parse(localStorage.getItem("memories"));
    if (savedMemories) {
      setMemories(savedMemories);
    }
  }, []);

  // Save memories to localStorage whenever the memories state changes
  useEffect(() => {
    if (memories.length > 0) {
      localStorage.setItem("memories", JSON.stringify(memories));
    }
  }, [memories]);

  // Handle text inputs
  const handleInputChange = (e) => {
    setNewMemory({ ...newMemory, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewMemory({ ...newMemory, imgSrc: imageUrl });
    }
  };

  // Function to add a new memory
  const addMemory = () => {
    if (!newMemory.title || !newMemory.description || !newMemory.date || !newMemory.imgSrc) {
      alert("Please fill out all fields before adding a memory.");
      return;
    }

    const newMemoryWithId = { ...newMemory, id: Date.now() }; // Use timestamp as id
    const updatedMemories = [...memories, newMemoryWithId];
    setMemories(updatedMemories);
    setNewMemory({ title: "", description: "", date: "", imgSrc: "" });
    setImagePreview(null);

    // Navigate to the "Saved Memories" page
    navigate("/saved-memories");
  };

  // Function to remove a memory
  const removeMemory = (id) => {
    const updatedMemories = memories.filter((memory) => memory.id !== id);
    setMemories(updatedMemories);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>📸 Digital Memory Lane 🎉</h1>
          <p>Relive your best moments with friends and loved ones!</p>
          <button className="add-memory-btn" onClick={() => navigate("/add-memory")}>
            + Add Memory
          </button>
        </header>

        {/* Routes */}
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div className="timeline">
                {memories.map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    className={`memory-card ${index % 2 === 0 ? "left" : "right"}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img src={memory.imgSrc} alt={memory.title} />
                    <div className="memory-info">
                      <h3>{memory.title}</h3>
                      <p>{memory.description}</p>
                      <span>{memory.date}</span>
                      <button className="remove-btn" onClick={() => removeMemory(memory.id)}>
                        ❌ Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            }
          />

          {/* Add Memory Route */}
          <Route
            path="/add-memory"
            element={
              <div className="memory-form">
                <h2>Add a New Memory</h2>
                <input
                  type="text"
                  name="title"
                  placeholder="Memory Title"
                  value={newMemory.title}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newMemory.description}
                  onChange={handleInputChange}
                ></textarea>
                <input type="date" name="date" value={newMemory.date} onChange={handleInputChange} />
                {/* Image Upload */}
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                <button className="save-btn" onClick={addMemory}>
                  Save Memory
                </button>
                <button className="cancel-btn" onClick={() => navigate("/")}>
                  Cancel
                </button>
              </div>
            }
          />

          {/* Saved Memories Route */}
          <Route
            path="/saved-memories"
            element={
              <div className="saved-memories">
                <h2>Your Saved Memories</h2>
                {memories.length === 0 ? (
                  <p>No memories saved yet. Add some memories!</p>
                ) : (
                  memories.map((memory) => (
                    <div key={memory.id} className="memory-item">
                      <img src={memory.imgSrc} alt={memory.title} />
                      <h3>{memory.title}</h3>
                      <p>{memory.description}</p>
                      <span>{memory.date}</span>
                    </div>
                  ))
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
