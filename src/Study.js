import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from './utils/api/index.js';

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const loadDeck = async () => {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    };
    loadDeck();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (cardIndex < deck.cards.length - 1) {
      setCardIndex(cardIndex + 1);
      setIsFlipped(false);
    } else {
      const restart = window.confirm('Restart this deck?');
      if (restart) {
        setCardIndex(0);
        setIsFlipped(false);
      } else {
        history.push('/');
      }
    }
  };

  if (deck.cards && deck.cards.length < 3) {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study. Add more cards to this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  if (!deck.name) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {deck.name}</h2>
      <div className="card">
        <div className="card-body">
          {isFlipped ? <p>{deck.cards[cardIndex].back}</p> : <p>{deck.cards[cardIndex].front}</p>}
          <button className="btn btn-secondary mr-2" onClick={handleFlip}>
            Flip
          </button>
          {isFlipped && <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>}
        </div>
      </div>
    </div>
  );
}

export default Study;
