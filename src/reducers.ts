import Movie from "./Movie";

// Define the structure of the state
interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

// Define the initial state based on the MovieState type
export const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

// Define action types
type MovieAction =
  | { type: "FETCH_MOVIES_REQUEST" }
  | { type: "FETCH_MOVIES_SUCCESS"; payload: Movie[] }
  | { type: "FETCH_MOVIES_FAILURE"; payload: string };

// Update the reducer function with proper types
export const movieReducer = (
  state: MovieState,
  action: MovieAction
): MovieState => {
  switch (action.type) {
    case "FETCH_MOVIES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_MOVIES_SUCCESS":
      return { ...state, loading: false, movies: action.payload, error: null };
    case "FETCH_MOVIES_FAILURE":
      return { ...state, loading: false, movies: [], error: action.payload };
    default:
      return state;
  }
};
