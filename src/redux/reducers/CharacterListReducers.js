const SET_STAR_WAR_CHARACTERS = "SET_STAR_WAR_CHARACTERS";
const INCREASE_CURRENT_PAGE = "INCREASE_CURRENT_PAGE";
const LOADING_STAR_WAR_CHARACTERS = "LOADING_STAR_WAR_CHARACTERS";
const FAILED_STAR_WAR_CHARACTERS = "FAILED_STAR_WAR_CHARACTERS";
const CLEAR_STAR_WAR_CHARACTERS = "CLEAR_STAR_WAR_CHARACTERS";

const initialState = {
  starWarCharacters: [],
  currentPage: 1,
  error: null,
  loading: false,
};

export default function characterListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STAR_WAR_CHARACTERS:
      return {
        ...state,
        loading: false,
        error: null,
        starWarCharacters: [...state.starWarCharacters, ...action.payload],
      };
    case INCREASE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case LOADING_STAR_WAR_CHARACTERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_STAR_WAR_CHARACTERS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_STAR_WAR_CHARACTERS:
      return initialState;
    default:
      return state;
  }
}
