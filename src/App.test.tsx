import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import for better Jest DOM assertions
import App from "./App";

// Mocking the axios module to prevent actual API calls
jest.mock("axios");

// Write tests for the main functionalities of your app
describe("Movie Search App", () => {
  test("renders the app title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Movie Search App/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("searches for movies", async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search for a movie/i);
    const searchButton = screen.getByText(/Search/i);

    fireEvent.change(searchInput, { target: { value: "Inception" } });
    fireEvent.click(searchButton);

    // Wait for the asynchronous fetchMovies function to complete
    await waitFor(() => screen.getByText(/Loading/i));

    const movieTitle = screen.getByText(/Inception/i);
    expect(movieTitle).toBeInTheDocument();
  });

  // Add more tests for other functionalities like sorting, pagination, etc.

  test("toggles dark mode", () => {
    render(<App />);
    const darkModeToggle = screen.getByTestId("dark-mode-toggle");

    fireEvent.click(darkModeToggle);

    // Check if the background color changes after toggling dark mode
    expect(document.body).toHaveStyle("background: #2c3e50");
  });

  // Add more tests as needed for other components and functionalities
});
