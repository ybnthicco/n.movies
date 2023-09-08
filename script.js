// script.js

const apiKey = '7f4a091146e24dcd04881d585cb3a68e'; // Replace with your TMDB API key
const movieContainer = document.getElementById("movie-container");
const loadMoreButton = document.getElementById("load-more");
const searchInput = document.getElementById("search-input");

let currentPage = 1; // Keep track of the current page
let currentQuery = ''; // Keep track of the current search query

// Function to open the movie details page with a specific movie ID
function openMovieDetailsPage(movieId) {
    window.location.href = `movie-details.html?movieId=${movieId}`;
}



// Function to fetch movies from TMDB API based on a page number and search query
async function fetchMovies(page, query = '') {
    try {
        const apiUrl = query
            ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`
            : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        data.results.forEach((movie) => {
            const moviePosterContainer = createMoviePoster(movie);
            movieContainer.appendChild(moviePosterContainer);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to create a movie poster element with a title caption
function createMoviePoster(movie) {
    const moviePosterContainer = document.createElement("div");
    moviePosterContainer.classList.add("movie-poster-container");

    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    moviePoster.alt = movie.title;
    moviePoster.classList.add("movie-poster");

    const titleCaption = document.createElement("div");
    titleCaption.classList.add("movie-title");
    titleCaption.textContent = movie.title;

    moviePosterContainer.appendChild(moviePoster);
    moviePosterContainer.appendChild(titleCaption);

    moviePosterContainer.addEventListener("click", () => {
        openMovieDetailsPage(movie.id);
    });

    return moviePosterContainer;
}


// Function to handle the "Load More" button click
function handleLoadMore() {
    currentPage++; // Increment the current page
    fetchMovies(currentPage, currentQuery); // Fetch and display more movies with the current query
}

// Function to handle the search input as you type
function handleSearchInput() {
    const query = searchInput.value.trim();

    // Clear previous results
    movieContainer.innerHTML = '';

    if (query !== '') {
        currentQuery = query;
        currentPage = 1; // Reset the current page when typing
        fetchMovies(currentPage, query);
    } else {
        // If the search input is empty, show popular movies
        currentQuery = '';
        fetchMovies(currentPage);
    }
}

// Add event listeners to the "Load More" button and search input
loadMoreButton.addEventListener("click", handleLoadMore);
searchInput.addEventListener("input", handleSearchInput);

// Load initial movies on page load
fetchMovies(currentPage);
