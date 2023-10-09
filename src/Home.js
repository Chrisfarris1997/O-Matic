import React from "react";
import { Link } from "react-router-dom";

function Home({ decks, setDecks }) {
  const handleDelete = (deckId) => {
    // Implement your deck deletion logic here, for example, using an API call.
    // For this example, let's filter out the deck with the specified ID.
    const updatedDecks = decks.filter((deck) => deck.id !== deckId);
    setDecks(updatedDecks);
    // You may want to make an API call here to delete the deck on the server.
  };

  if (!decks || decks.length === 0) {
    return (
      <div>
        <h2>No decks available. Create a deck to get started.</h2>
        <Link to="/decks/new" className="btn btn-primary">
          Create Deck
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Decks</h2>
      <div className="deck-list">
        {decks.map((deck) => (
          <div key={deck.id} className="deck-item">
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}`} className="btn btn-primary mr-2">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-success mr-2">
              Study
            </Link>
            <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <Link to="/decks/new" className="btn btn-primary mt-3">
        Create Deck
      </Link>
    </div>
  );
}

export default Home;