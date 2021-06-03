// set date
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// close links
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

// select elements from the dom
const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#input-value");
const movieSearch = document.querySelector("#movies-search");
const upcomingMovies = document.querySelector("#upcoming-movies");
const topRatedMovies = document.querySelector("#top-rated");
const popularMovies = document.querySelector("#popular-movies");

navToggle.addEventListener("click", () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
// fixed navbar

window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;
    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});
//movies section functions

let movieSection = (movies) => {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img
      src=${image_url + movie.poster_path}
      alt=${name}
      data-movie-id=${movie.id}/>`;
    }
  });
};
const createMovieContainer = (movies) => {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `
    <section class="section">
      ${movieSection(movies)}
    </section>
    <div class="content ">
      <p id="content-close"></p>
    </div>
  `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
};

//search movies
const renderSearchMovies = (data) => {
  // data.result
  movieSearch.innerHTML = "";
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSearch.appendChild(movieBlock);
  console.log("Data", data);
};

// upcoming movies
const renderUpcomingMovies = (data) => {
  // data.result

  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  upcomingMovies.appendChild(movieBlock);
};

//top movies
const topMovies = (data) => {
  // data.result

  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  topRatedMovies.appendChild(movieBlock);
};

// popular movies
const renderpopularMovies = (data) => {
  // data.result

  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  popularMovies.appendChild(movieBlock);
};

const handleError = (error) => {
  console.log("error", error);
};

buttonElement.addEventListener("click", (e) => {
  e.preventDefault();
  const value = inputElement.value;
  searchMovie(value);

  inputElement.value = "";
  console.log(value);
});

getUpcomingMovies();
getTopRatedMovies();
getPopularMovies();
// renderTopMovies();
