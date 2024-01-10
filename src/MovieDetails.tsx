import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Movie from "./Movie";

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  darkMode: boolean;
}

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div<{ darkMode: boolean }>`
  background: ${(props: any) => (props.darkMode ? "#34495e" : "#fff")};
  color: ${(props: any) => (props.darkMode ? "#ecf0f1" : "#333")};
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button<{ darkMode: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props: any) => (props.darkMode ? "#ecf0f1" : "#333")};
  transition: color 0.3s;

  &:hover {
    color: #e74c3c;
  }
`;

const MovieTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const MovieDetailsText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  onClose,
  darkMode,
}) => {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e: any) => e.stopPropagation()} darkMode={darkMode}>
        <CloseButton onClick={onClose} darkMode={darkMode}>
          &times;
        </CloseButton>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieDetailsText>{movie.overview}</MovieDetailsText>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
      </Modal>
    </Overlay>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default MovieDetails;
