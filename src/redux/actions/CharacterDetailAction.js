import axios from "axios";

const SET_STAR_WAR_CHARACTER = "SET_STAR_WAR_CHARACTER";
const DELETE_STAR_WAR_CHARACTER = "DELETE_STAR_WARS_CHARACTER";
const LOADING_STAR_WAR_CHARACTER = "LOADING_STAR_WARS_CHARACTER";
const FAILED_STAR_WAR_CHARACTER = "FAILED_STAR_WAR_CHARACTER";

export const getStarWarCharacter = (id) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_STAR_WAR_CHARACTER,
    });

    try {
      let response;
      response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      dispatch({ type: SET_STAR_WAR_CHARACTER, payload: response.data });
    } catch (error) {
      dispatch({
        type: FAILED_STAR_WAR_CHARACTER,
        payload: error.response.data.detail,
      });
    }
  };
};

export const clearStarWarCharacter = () => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_STAR_WAR_CHARACTER,
    });
  };
};
