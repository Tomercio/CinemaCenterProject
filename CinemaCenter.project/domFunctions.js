const createSingleMovieCard = (filmObj) => {
    const filmCardEl = document.createElement('div');
    filmCardEl.className = 'single-film-card';
    filmCardEl.innerHTML = `
        <header>
            <h1>${filmObj.Title}</h1>
            <h2>Year: ${filmObj.Year}</h2>
            <p>By ${filmObj.Director}<p>
        </header>
            <img src="${filmObj.Poster}" alt="${filmObj.Title}">
            <p>Actors: ${filmObj.Actors}</p>
            <p>${filmObj.Plot}</p>
        <button onclick="window.open('https://www.imdb.com/title/${filmObj.imdbID}')">View on IMDB</button>

    `;
    return filmCardEl;
};

const creatCardGeneral = (filmObj) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'general-film-card col';
    cardEl.innerHTML = `
    <div class="card p-2 bg-transparent border-1">
        <img src="${filmObj.Poster}" class="card-img-top" alt="${filmObj.Title}">
        <div class="card-body">
            <h5 class="card-title">${filmObj.Title}</h5>
            <p class="card-text">${filmObj.Year}</p>
            <button onclick="showMovieDetails('${filmObj.imdbID}')">More Details</button>
        </div>
    </div>
    `;
    return cardEl;
};

const addElement = (elToAddTo, elToBeAdded) => elToAddTo.append(elToBeAdded);

const render = (elToRenderIn, moviesList, createCard) => {
    elToRenderIn.innerHTML = "";
    moviesList.map(movie => addElement(elToRenderIn, createCard(movie)));
};

const renderSingle = (elToRenderIn, movieItem, createCard) => {
    elToRenderIn.innerHTML = "";
    addElement(elToRenderIn, createCard(movieItem));
};

export { createSingleMovieCard, creatCardGeneral, render, renderSingle };
