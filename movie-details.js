/// movie-details.js

// Function to retrieve URL parameters
function getUrlParam(paramName) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(paramName);
}

// Function to fetch and display movie details based on a movie ID
async function fetchAndDisplayMovieDetails() {
    const movieId = getUrlParam("movieId");

    if (movieId) {
        try {
            // Replace 'YOUR_TMDB_API_KEY' with your actual TMDB API key
            const apiKey = '7f4a091146e24dcd04881d585cb3a68e';
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
            const movieDetails = await response.json();

            // Display movie details in the page
            document.title = movieDetails.title; // Set page title
            document.getElementById("movie-title").textContent = movieDetails.title;
            document.getElementById("movie-release-date").textContent = `Release Date: ${movieDetails.release_date}`;
            document.getElementById("movie-overview").textContent = movieDetails.overview;
            document.getElementById("movie-poster").src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
        } catch (error) {
            console.error("Error fetching or displaying movie details:", error);
        }
    } else {
        // Handle the case where movie ID is missing in the URL
        console.error("Movie ID not found in URL.");
    }
}

// Call the function to fetch and display movie details
fetchAndDisplayMovieDetails();
