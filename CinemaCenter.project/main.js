import { getMoviesListByQuery, getMovieListById } from "./apiServices/movieServices.js";
import { createSingleMovieCard, creatCardGeneral, render, renderSingle } from "./domFunctions.js";

// Elements
const contentEl = document.getElementById('content');
const query = 's=2024';
const modal = document.getElementById('movieModal');
const span = document.getElementsByClassName('myClose')[0];

// Variables
let allMovies = [];
let filteredMovies = [];
let currentPage = 1;
const itemsPerPage = 12;

// Functions
const renderPage = (page, movies) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = movies.slice(start, end);
    render(contentEl, paginatedItems, creatCardGeneral);
    updateButtons(movies);
};

const updateButtons = (movies) => {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(movies.length / itemsPerPage);
};

const handleNext = () => {
    if (currentPage < Math.ceil(filteredMovies.length / itemsPerPage)) {
        currentPage++;
        renderPage(currentPage, filteredMovies);
    }
};

const handlePrev = () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage, filteredMovies);
    }
};

const sortMoviesAlphabetically = (order) => {
    filteredMovies.sort((a, b) => order === 'A - Z' ? a.Title.localeCompare(b.Title) : b.Title.localeCompare(a.Title));
    currentPage = 1;
    renderPage(currentPage, filteredMovies);
};

const searchMovies = (searchText) => {
    const lowercasedText = searchText.toLowerCase();
    filteredMovies = allMovies.filter(movie => movie.Title.toLowerCase().includes(lowercasedText));
    currentPage = 1;
    renderPage(currentPage, filteredMovies);
};

// API Calls
getMoviesListByQuery(query).then(data => {
    allMovies = data.Search;
    filteredMovies = allMovies;
    renderPage(currentPage, filteredMovies);
});

// Event Listeners
document.getElementById('nextButton').addEventListener('click', handleNext);
document.getElementById('prevButton').addEventListener('click', handlePrev);
document.getElementById('select').addEventListener('change', (event) => {
    const value = event.target.value;
    if (value === 'A - Z' || value === 'Z - A') {
        sortMoviesAlphabetically(value);
    }
});
document.getElementById('searchButton').addEventListener('click', () => {
    const searchQuery = document.getElementById('searchQuery').value;
    searchMovies(searchQuery);
});
document.getElementById('searchQuery').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const searchQuery = document.getElementById('searchQuery').value;
        searchMovies(searchQuery);
    }
});

// Modal functionality
span.onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

const showModal = (movie) => {
    document.getElementById('modalTitle').innerText = movie.Title;
    document.getElementById('modalYear').innerText = `Year: ${movie.Year}`;
    document.getElementById('modalDirector').innerText = `Director: ${movie.Director}`;
    document.getElementById('modalActors').innerText = `Actors: ${movie.Actors}`;
    document.getElementById('modalPlot').innerText = movie.Plot;
    document.getElementById('modalPoster').src = movie.Poster;
    const imdbButton = document.getElementById('imdbButton');
    imdbButton.href = `https://www.imdb.com/title/${movie.imdbID}`;
    modal.style.display = 'block';
};

window.showMovieDetails = (imdbID) => {
    getMovieListById(imdbID).then(data => {
        showModal(data);
    });
};
