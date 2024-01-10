import React from "react";
import styled from "styled-components";
import Movie from "./Movie";

const ListContainer = styled.div`
  margin-top: 20px;
`;

interface MovieItemProps {
  darkMode: boolean;
}

const MovieItem = styled.li<MovieItemProps>`
  list-style: none;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.darkMode ? "#34495e" : "#f9f9f9")};
  }
`;

const MovieTitle = styled.span<MovieItemProps>`
  font-size: 18px;
  color: ${(props) => (props.darkMode ? "#ecf0f1" : "#333")};
`;

const ReleaseDate = styled.span<MovieItemProps>`
  font-size: 14px;
  color: ${(props) => (props.darkMode ? "#bdc3c7" : "#777")};
`;

const SortButton = styled.button<MovieItemProps>`
  background: #3498db;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2980b9;
  }
`;

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  error?: string;
  onMovieClick: (movie: Movie) => void;
  handleSort: (sortType: any) => void;
  darkMode: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  loading,
  error,
  onMovieClick,
  handleSort,
  darkMode,
}) => {
  return (
    <ListContainer>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {movies.map((movie) => (
          <MovieItem key={movie.overview} darkMode={darkMode}>
            <MovieTitle onClick={() => onMovieClick(movie)} darkMode={darkMode}>
              {movie.title}
            </MovieTitle>
            <ReleaseDate darkMode={darkMode}>{movie.release_date}</ReleaseDate>
          </MovieItem>
        ))}
      </ul>
      {movies.length > 0 && (
        <SortButton onClick={() => handleSort("name")} darkMode={darkMode}>
          Sort by Name
        </SortButton>
      )}
      {movies.length > 0 && (
        <SortButton
          onClick={() => handleSort("release_date")}
          darkMode={darkMode}
        >
          Sort by Release Date
        </SortButton>
      )}
    </ListContainer>
  );
};

export default MovieList;
