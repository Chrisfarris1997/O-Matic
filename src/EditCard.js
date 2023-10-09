import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from './utils/api/index.js';

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ front: '', back: '' });
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const loadDeck = async () => {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
      const loadedCard = await readCard(cardId);
      setFormData({ front: loadedCard.front, back: loadedCard.back });
    };
    loadDeck();
  }, [deckId, cardId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard({ ...formData, id: cardId, deckId: deckId });
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      {/* Form to Edit Card */}
      <h2>{`Edit Card ${cardId}`}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            onChange={handleChange}
            value={formData.front}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            onChange={handleChange}
            value={formData.back}
            required
          ></textarea>
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditCard;
