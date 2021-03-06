import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import characterDetailReducer from "../src/redux/reducers/CharacterDetailReducers";
import characterListReducer from "../src/redux/reducers/CharacterListReducers";

const rootReducer = combineReducers({
  characterReducer: characterDetailReducer,
  characterListReducer: characterListReducer,
});

const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
