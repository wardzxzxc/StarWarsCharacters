const SET_STAR_WAR_CHARACTER = "SET_STAR_WAR_CHARACTER";
const DELETE_STAR_WAR_CHARACTER = "DELETE_STAR_WARS_CHARACTER";
const LOADING_STAR_WAR_CHARACTER = "LOADING_STAR_WARS_CHARACTER";
const FAILED_STAR_WAR_CHARACTER = "FAILED_STAR_WAR_CHARACTER";

const initialState = {
  starWarCharacter: null,
  error: null,
  loading: false,
};

export default function characterDetailReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STAR_WAR_CHARACTER:
      return {
        ...state,
        loading: false,
        error: null,
        starWarCharacter: action.payload,
      };
    case DELETE_STAR_WAR_CHARACTER:
      return initialState;
    case LOADING_STAR_WAR_CHARACTER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_STAR_WAR_CHARACTER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
