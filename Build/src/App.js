import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import FAQ from "./FAQ";

const App = () => {
  const [memories, setMemories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMemory, setNewMemory] = useState({
    title: "",
    description: "",
    date: "",
    imgSrc: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [currentPage, setCurrentPage] = useState("home"); // State to manage the current page

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
    setMemories([...memories, newMemoryWithId]);
    setNewMemory({ title: "", description: "", date: "", imgSrc: "" });
    setImagePreview(null);
    setShowForm(false); // Hide the form after adding
  };

  // Function to remove a memory
  const removeMemory = (id) => {
    setMemories(memories.filter((memory) => memory.id !== id));
  };

  // Navigate to different pages
  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>📸 Digital Memory Lane 🎉</h1>
        <p>Relive your best moments with friends and loved ones!</p>

        <div className="nav-buttons">
          <button onClick={() => navigateToPage("home")}>Home</button>
          <button onClick={() => navigateToPage("about")}>About Us</button>
          <button onClick={() => navigateToPage("contact")}>Contact Us</button>
          <button onClick={() => navigateToPage("faq")}>FAQ</button>
        </div>
      </header>

      {/* Conditionally render content based on currentPage */}
      {currentPage === "home" ? (
        <>
          <button className="add-memory-btn" onClick={() => setShowForm(true)}>
            + Add Memory
          </button>

          {/* Memory Input Form */}
          {showForm && (
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
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          )}

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
        </>
      ) : currentPage === "about" ? (
        <AboutUs />
      ) : currentPage === "contact" ? (
        <ContactUs />
      ) : currentPage === "faq" ? (
        <FAQ />
      ) : null}
    </div>
  );
};

export default App;
