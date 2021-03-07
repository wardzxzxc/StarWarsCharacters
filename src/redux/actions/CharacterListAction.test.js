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

const SET_STAR_WAR_CHARACTERS = "SET_STAR_WAR_CHARACTERS";
const INCREASE_CURRENT_PAGE = "INCREASE_CURRENT_PAGE";
const LOADING_STAR_WAR_CHARACTERS = "LOADING_STAR_WAR_CHARACTERS";
const FAILED_STAR_WAR_CHARACTERS = "FAILED_STAR_WAR_CHARACTERS";
const CLEAR_STAR_WAR_CHARACTERS = "CLEAR_STAR_WAR_CHARACTERS";

describe("getFirstPage", () => {
  it("expected actions should be dispatched when request is successful", () => {
    const store = mockStore();
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
    const store = mockStore();
    axiosMock.reset();
    store.clearActions();
    const mockedError = {
      detail: "Not found",
    };
    //Axios returns 404 with error
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
    // Mocked state, next page is page 2
    const mockedState = {
      characterListReducer: {
        currentPage: 2,
      },
    };

    const store = mockStore(mockedState);
    store.clearActions();
    axiosMock.reset();

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
        type: LOADING_STAR_WAR_CHARACTERS,
      },
      { type: SET_STAR_WAR_CHARACTERS, payload: expectedData },
      {
        type: INCREASE_CURRENT_PAGE,
      },
    ];

    return store.dispatch(getNextPage()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it("expected actions should be dispatched when request is unsuccessful", () => {
    //Page 10 and non-existent
    const mockedState = {
      characterListReducer: {
        currentPage: 10,
      },
    };
    const store = mockStore(mockedState);
    axiosMock.reset();
    store.clearActions();

    const mockedError = {
      detail: "Not found",
    };
    //Axios returns 404 with error as page 10 cannot be found
    axiosMock
      .onGet("https://swapi.dev/api/people/?page=10")
      .reply(404, mockedError);

    const expectedActions = [
      {
        type: LOADING_STAR_WAR_CHARACTERS,
      },

      { type: FAILED_STAR_WAR_CHARACTERS, payload: "Not found" },
    ];

    return store.dispatch(getNextPage()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});

describe("clearPage", () => {
  it("expected actions should be dispatched when clearing current state in redux store", () => {
    const store = mockStore();
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
