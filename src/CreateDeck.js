import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from './utils/api/index.js';

function CreateDeck({ setDecks }) {
  const history = useHistory();
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDeck = await createDeck(formData);
      setDecks((prevDecks) => [...prevDecks, newDeck]);
      history.push(`/decks/${newDeck.id}`); // Redirect to the new deck's page
    } catch (error) {
      console.error('Error creating deck: ', error);
      // Handle error here, show a message to the user, or navigate to an error page.
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={handleChange}
            value={formData.description}
            required
          ></textarea>
        </div>
        <Link to="/" className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
