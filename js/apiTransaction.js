// Initial Values
const API_KEY = "b02fc998ab7b3ee7ec0f3d939a335148";

const url = `https://api.themoviedb.org/3/search/movie?api_key=b02fc998ab7b3ee7ec0f3d939a335148`;
const image_url = "https://image.tmdb.org/t/p/w500";

const generateUrl = (path) => {
  const url = `https://api.themoviedb.org/3${path}?api_key=b02fc998ab7b3ee7ec0f3d939a335148`;
  return url;
};

const requestMovies = (url, onComplete, onError) => {
  fetch(url)
    .then((response) => response.json())
    .then(onComplete)
    .catch(onError);
};

const searchMovie = (value) => {
  const path = "/search/movie";
  const url = generateUrl(path) + "&query=" + value;
  requestMovies(url, renderSearchMovies, handleError);
};

const getUpcomingMovies = () => {
  const path = "/movie/top_rated";
  const url = generateUrl(path);
  requestMovies(url, renderMovies, handleError);
};

const getTopRatedMovies = () => {
  const path = "/movie/upcoming";
  const url = generateUrl(path);
  requestMovies(url, topMovies, handleError);
};
const getPopularMovies = () => {
  const path = "/movie/popular";
  const url = generateUrl(path);
  requestMovies(url, renderTopMovies, handleError);
};
