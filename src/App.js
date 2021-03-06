import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CharacterList } from "./components/CharacterList";
import { CharacterDetail } from "./components/CharacterDetail";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1> Star Wars Characters</h1>
      <div>
        <Route exact path="/">
          <Redirect to="/people" />
        </Route>
        <Route exact path="/people">
          <CharacterList />
        </Route>
        <Route path="/people/:id">
          <CharacterDetail />
        </Route>
      </div>
    </div>
  );
}

export default App;
