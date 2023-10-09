import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../Home";
import Study from "../Study";
import CreateDeck from "../CreateDeck";
import Deck from "../Deck";
import EditDeck from "../EditCard";
import AddCard from "../AddCard";
import EditCard from "../EditCard";
import NotFound from "./NotFound";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new" component={CreateDeck} />
          <Route path="/decks/:deckId/study" component={Study} />
          <Route path="/decks/:deckId/edit" component={EditDeck} />
          <Route path="/decks/:deckId/cards/new" component={AddCard} />
          <Route path="/decks/:deckId/cards/:cardId/edit" component={EditCard} />
          <Route path="/decks/:deckId" component={Deck} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
