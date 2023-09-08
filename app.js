const apiKey = '7f4a091146e24dcd04881d585cb3a68e';
const baseURL = 'https://api.themoviedb.org/3';
const posterBaseURL = 'https://image.tmdb.org/t/p/w500';

const movieContainer = document.getElementById('movie-container');

// Function to fetch popular movies from TMDB API
async function fetchMovies() {
    try {
        const response = await fetch(`${baseURL}/movie/popular?api_key=${apiKey}`);
        const data = await response.json();

        const movies = data.results;
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display movies
function displayMovies(movies) {
    movieContainer.innerHTML = '';

    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const posterURL = movie.poster_path
            ? `${posterBaseURL}${movie.poster_path}`
            : 'placeholder.png'; // You can add a placeholder image

        movieCard.innerHTML = `
            <img src="${posterURL}" alt="${movie.title}" class="movie-poster">
            <h2 class="movie-title">${movie.title}</h2>
        `;

        movieContainer.appendChild(movieCard);
    });
}

// Load popular movies when the page loads
window.addEventListener('load', () => {
    fetchMovies();
});
