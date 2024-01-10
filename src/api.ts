import axios from "axios";
const API_KEY = "b1bdaccbdf3f0d5ccd4d1a80f85215a6";
const API_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (dispatch: any, searchTerm: string) => {
  dispatch({ type: "FETCH_MOVIES_REQUEST" });

  try {
    const response = await axios.get(
      `${API_URL}?api_key=${API_KEY}&query=${searchTerm}`
    );
    dispatch({ type: "FETCH_MOVIES_SUCCESS", payload: response.data.results });
  } catch (error: any) {
    dispatch({ type: "FETCH_MOVIES_FAILURE", payload: error.message });
  }
};
