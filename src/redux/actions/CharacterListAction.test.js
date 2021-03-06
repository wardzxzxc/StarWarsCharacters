import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getFirstPage, getNextPage, clearPage } from "./CharacterListAction";
import MockAdapter from "axios-mock-adapter";
import { mockedDataGetFirstPage } from "./MockedDataGetFirstPage";
import { expectedDataGetFirstPage } from "./ExpectedDataGetFirstPage";
import { mockedDataGetNextPage } from "./MockedDataGetNextPage";
import { expectedDataGetNextPage } from "./ExpectedDataGetNextPage";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const axiosMock = new MockAdapter(axios);
const store = mockStore();

const SET_STAR_WAR_CHARACTERS = "SET_STAR_WAR_CHARACTERS";
const INCREASE_CURRENT_PAGE = "INCREASE_CURRENT_PAGE";
const LOADING_STAR_WAR_CHARACTERS = "LOADING_STAR_WAR_CHARACTERS";
const FAILED_STAR_WAR_CHARACTERS = "FAILED_STAR_WAR_CHARACTERS";
const CLEAR_STAR_WAR_CHARACTERS = "CLEAR_STAR_WAR_CHARACTERS";

describe("getFirstPage", () => {
  it("expected actions should be dispatched when request is successful", () => {
    axiosMock.reset();
    store.clearActions();
    // Expected data
    const mockedData = mockedDataGetFirstPage;

    const expectedData = expectedDataGetFirstPage;

    //Axios returns 200 with data
    axiosMock.onGet("https://swapi.dev/api/people/").reply(200, mockedData);

    //Expected Actions to get from Action Creator
    const expectedActions = [
      {
        type: LOADING_STAR_WAR_CHARACTERS,
      },
      { type: SET_STAR_WAR_CHARACTERS, payload: expectedData },
    ];

    return store.dispatch(getFirstPage()).then(() => {
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
    axiosMock.onGet("https://swapi.dev/api/people/").reply(404, mockedError);

    const expectedActions = [
      {
        type: LOADING_STAR_WAR_CHARACTERS,
      },

      { type: FAILED_STAR_WAR_CHARACTERS, payload: "Not found" },
    ];

    return store.dispatch(getFirstPage()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});

describe("getNextPage", () => {
  it("expected actions should be dispatched when request is successful", () => {
    axiosMock.reset();
    store.clearActions();
    // Mocked data
    const mockedData = mockedDataGetNextPage;
    // Expected data
    const expectedData = expectedDataGetNextPage;

    //Axios returns 200 with data
    axiosMock
      .onGet("https://swapi.dev/api/people/?page=2")
      .reply(200, mockedData);

    //Expected Actions to get from Action Creator
    const expectedActions = [
      {
        type: INCREASE_CURRENT_PAGE,
      },
      {
        type: LOADING_STAR_WAR_CHARACTERS,
      },
      { type: SET_STAR_WAR_CHARACTERS, payload: expectedData },
    ];

    return store.dispatch(getFirstPage()).then(() => {
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
    axiosMock.onGet("https://swapi.dev/api/people/").reply(404, mockedError);

    const expectedActions = [
      {
        type: LOADING_STAR_WAR_CHARACTERS,
      },

      { type: FAILED_STAR_WAR_CHARACTERS, payload: "Not found" },
    ];

    return store.dispatch(getFirstPage()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});

describe("clearPage", () => {
  it("expected actions should be dispatched when clearing current state in redux store", () => {
    store.clearActions();

    //Expected Actions to get from Action Creator
    const expectedActions = [
      {
        type: CLEAR_STAR_WAR_CHARACTERS,
      },
    ];

    return store.dispatch(clearPage()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
