import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  clearStarWarCharacter,
  getStarWarCharacter,
} from "./CharacterDetailAction";
import MockAdapter from "axios-mock-adapter";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const axiosMock = new MockAdapter(axios);
const store = mockStore();

const SET_STAR_WAR_CHARACTER = "SET_STAR_WAR_CHARACTER";
const LOADING_STAR_WAR_CHARACTER = "LOADING_STAR_WARS_CHARACTER";
const DELETE_STAR_WAR_CHARACTER = "DELETE_STAR_WARS_CHARACTER";
const FAILED_STAR_WAR_CHARACTER = "FAILED_STAR_WAR_CHARACTER";

describe("getStarWarCharacter", () => {
  it("expected actions should be dispatched when request is successful", () => {
    axiosMock.reset();
    store.clearActions();
    // Expected data
    const data = {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "http://swapi.dev/api/planets/1/",
      films: [
        "http://swapi.dev/api/films/1/",
        "http://swapi.dev/api/films/2/",
        "http://swapi.dev/api/films/3/",
        "http://swapi.dev/api/films/6/",
      ],
      species: [],
      vehicles: [
        "http://swapi.dev/api/vehicles/14/",
        "http://swapi.dev/api/vehicles/30/",
      ],
      starships: [
        "http://swapi.dev/api/starships/12/",
        "http://swapi.dev/api/starships/22/",
      ],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "http://swapi.dev/api/people/1/",
    };

    //Axios returns 200 with data
    axiosMock.onGet("https://swapi.dev/api/people/1/").reply(200, data);

    //Expected Actions to get from Action Creator
    const expectedActions = [
      {
        type: LOADING_STAR_WAR_CHARACTER,
      },
      { type: SET_STAR_WAR_CHARACTER, payload: data },
    ];

    return store.dispatch(getStarWarCharacter(1)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it("expected actions should be dispatched when request is unsuccessful", () => {
    axiosMock.reset();
    store.clearActions();

    const mockedError = {
      detail: "Not found",
    };

    //Axios returns 404 with error, id = 17 is not found in API
    axiosMock.onGet("https://swapi.dev/api/people/17/").reply(404, mockedError);

    const expectedActions = [
      {
        type: LOADING_STAR_WAR_CHARACTER,
      },
      // Need to revisit pay load for error message
      { type: FAILED_STAR_WAR_CHARACTER, payload: "Not found" },
    ];

    return store.dispatch(getStarWarCharacter(17)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});

describe("clearStarWarCharacter", () => {
  it("expected actions should be dispatched when clearing current star wars character in redux store", () => {
    store.clearActions();

    //Expected Actions to get from Action Creator
    const expectedActions = [
      {
        type: DELETE_STAR_WAR_CHARACTER,
      },
    ];

    return store.dispatch(clearStarWarCharacter()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
