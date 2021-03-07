import axios from "axios";

const SET_STAR_WAR_CHARACTERS = "SET_STAR_WAR_CHARACTERS";
const INCREASE_CURRENT_PAGE = "INCREASE_CURRENT_PAGE";
const LOADING_STAR_WAR_CHARACTERS = "LOADING_STAR_WAR_CHARACTERS";
const FAILED_STAR_WAR_CHARACTERS = "FAILED_STAR_WAR_CHARACTERS";
const CLEAR_STAR_WAR_CHARACTERS = "CLEAR_STAR_WAR_CHARACTERS";

export const getFirstPage = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_STAR_WAR_CHARACTERS,
    });

    try {
      let response;
      response = await axios.get(`https://swapi.dev/api/people/`);
      dispatch({
        type: SET_STAR_WAR_CHARACTERS,
        payload: response.data.results,
      });
    } catch (error) {
      dispatch({
        type: FAILED_STAR_WAR_CHARACTERS,
        payload: error.response.data.detail,
      });
    }
  };
};

export const getNextPage = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: INCREASE_CURRENT_PAGE,
    });

    const currentPage = getState().characterListReducer.currentPage;

    dispatch({
      type: LOADING_STAR_WAR_CHARACTERS,
    });

    try {
      let response;
      response = await axios.get(
        `https://swapi.dev/api/people/?page=${currentPage}`
      );
      dispatch({
        type: SET_STAR_WAR_CHARACTERS,
        payload: response.data.results,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FAILED_STAR_WAR_CHARACTERS,
        payload: error.response.data,
      });
    }
  };
};

export const clearPage = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_STAR_WAR_CHARACTERS,
    });
  };
};
