import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from './utils/api/index.js';

function Deck({ decks, setDecks }) {
  const { deckId } = useParams();
  const history = useHistory();
  const deck = decks.find((deck) => deck.id === Number(deckId));

  if (!deck) {
    return <p>Deck not found.</p>;
  }

  const handleDeleteDeck = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this deck?');
    if (confirmDelete) {
      await deleteDeck(deckId);
      const updatedDecks = decks.filter((d) => d.id !== Number(deckId));
      setDecks(updatedDecks);
      history.push('/');
    }
  };

  const handleDeleteCard = async (cardId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this card?');
    if (confirmDelete) {
      await deleteCard(cardId);
      const updatedDeck = await readDeck(deckId);
      const updatedDecks = decks.map((d) => (d.id === updatedDeck.id ? updatedDeck : d));
      setDecks(updatedDecks);
    }
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      {/* Deck Information */}
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
      </div>

      {/* Buttons */}
      <div className="mb-3">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
          Study
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-2">
          Add Cards
        </Link>
        <button className="btn btn-danger" onClick={handleDeleteDeck}>
          Delete
        </button>
      </div>

      {/* Cards */}
      <h3>Cards</h3>
      {deck.cards.map((card) => (
        <div key={card.id} className="card">
          <div className="card-body">
            <h5 className="card-title">Question:</h5>
            <p className="card-text">{card.front}</p>
            <h5 className="card-title">Answer:</h5>
            <p className="card-text">{card.back}</p>
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
