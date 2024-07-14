const callApi = async (url, method = 'GET', body = undefined) => {
    const result = await fetch(url, {
        method,
        body
    });
    return result.json();
};

const getMoviesListByQuery = async (query) => {
    const apiKey = '19981a51'; 
    let page = 1;
    let results = [];
    let totalResults = 0;

    do {
        const url = `https://www.omdbapi.com/?${query}&apikey=${apiKey}&page=${page}`;
        const res = await callApi(url);
        
        if (res.Response === "True") {
            results = results.concat(res.Search);
            totalResults = parseInt(res.totalResults, 10);
            page++;
        } else {
            break;
        }
    } while (results.length < totalResults);

    return { Search: results, totalResults: totalResults };
};

const getMovieListById = (id) => {
    const apiKey = '19981a51'; 
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    return callApi(url);
};

export { callApi, getMoviesListByQuery, getMovieListById };
