import React, { useReducer, useState, useMemo } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import SearchForm from "./SearchForm";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import Pagination from "./Pagination";
import { movieReducer, initialState } from "./reducers";
import { fetchMovies } from "./api";
import Movie from "./Movie";

interface SortOrder {
  name: string;
  release_date: string;
}

interface AppProps {}

const GlobalStyle = createGlobalStyle<{ darkMode: boolean }>`
  body {
    background: ${(props: any) => (props.darkMode ? "#2c3e50" : "#ecf0f1")};
    color: ${(props: any) => (props.darkMode ? "#ecf0f1" : "#2c3e50")};
    transition: background 0.3s, color 0.3s;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #3498db;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  background: #3498db;
  color: #fff;
  padding: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2980b9;
  }
`;

const App: React.FC<AppProps> = () => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    name: "asc",
    release_date: "asc",
  });
  const [sortedBy, setSortedBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const moviesPerPage = 10;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      await fetchMovies(dispatch, searchTerm);
      setCurrentPage(1);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleSort = (type: keyof SortOrder) => {
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [type]: prevSortOrder[type] === "asc" ? "desc" : "asc",
    }));
    setSortedBy(type);
  };

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const sortedMovies = useMemo(() => {
    if (state.movies.length > 0) {
      return [...state.movies].sort((a, b) => {
        if (sortedBy === "name") {
          return sortOrder.name === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else if (sortedBy === "release_date") {
          return sortOrder.release_date === "asc"
            ? new Date(a.release_date).getTime() -
                new Date(b.release_date).getTime()
            : new Date(b.release_date).getTime() -
                new Date(a.release_date).getTime();
        }
        return 0;
      });
    }
    return state.movies;
  }, [state.movies, sortOrder, sortedBy]);

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <Container>
      <GlobalStyle darkMode={darkMode} />
      <IconContainer onClick={handleToggleDarkMode}>
        {darkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
      </IconContainer>
      <Title>Movie Search App</Title>
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <MovieList
        movies={currentMovies}
        loading={state.loading}
        error={state.error || undefined}
        onMovieClick={handleMovieClick}
        handleSort={handleSort}
        darkMode={darkMode}
      />
      {state.movies.length > moviesPerPage && (
        <Pagination
          totalPages={Math.ceil(sortedMovies.length / moviesPerPage)}
          currentPage={currentPage}
          onPageChange={handlePagination}
        />
      )}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={handleCloseDetails}
          darkMode={darkMode}
        />
      )}
    </Container>
  );
};

export default App;
