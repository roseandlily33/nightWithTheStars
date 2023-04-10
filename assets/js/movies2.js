let apiKey = ''; //Enter your api key here
let tmdbBaseUrl = 'https://api.themoviedb.org/3';
let selectBtn = document.getElementById('selectBtn');
const movieDiv = document.getElementById('movieDiv');

//Happens before step 1:
const getGenres = async() => {
    let genreRequestEndpoint = '/genre/movie/list';
    let requestParams = `?api_key=${apiKey}`;
    let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try{
        let response = await fetch(urlToFetch);
        if(response.ok){
            console.log('Got the genres');
            let jsonResponse = await response.json();
            let genres = jsonResponse.genres;
            console.log(genres);
            return genres;
        }
    } catch(err) {
        console.error(err);
    }
}

const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres');
    for(const genre of genres){
        let option = document.createElement('option');
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
}
//Step 1 in the list:
const getMovies = async() => {
    let selectedGenre = document.getElementById('genres').value;
    let movieEndpoint = '/discover/movie';
    let requestParams = `?api_key=${apiKey}&with_genre=${selectedGenre}`;
    let urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try{
        let response = await fetch(urlToFetch);
        if(response.ok){
            console.log('Getting Movies!')
            let jsonResponse = await response.json();
            //console.log(jsonResponse.results);
            let movies = jsonResponse.results;
            console.log(movies);
            return movies; 
        }
    } catch(error){
        console.error(err);
    }
}

const getMovieInfo = async(randomMovie) => {
    console.log('Getting movie info');
    let movieId = randomMovie.id;
    console.log(movieId);
    let movieEndpoint = `/movie/${movieId}`;
    let requestParams = `?api_key=${apiKey}`;
    let urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try{
        let response = await fetch(urlToFetch);
        if(response.ok){
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let movieInfo = jsonResponse;
            return movieInfo;
        }
    } catch(error){
        console.error(err);
    }
}

const getRandomMovie = (movies) => {
    console.log('Getting a random movie');
    let randomMovie =  Math.floor(Math.random() * movies.length);
    let selectedMovie = movies[randomMovie];
    console.log(selectedMovie);
    return selectedMovie;
}

const displayMovie = (info) => {
   console.log('Displaying movie');
   console.log(info);
   let movieInfo = document.createElement('movieInfo');
   movieInfo.setAttribute('id', 'movieInfo');
   movieInfo.innerHTML = info.title;
   let movieText = document.createElement('movieText');
   movieText.setAttribute('id', 'movieText');
   movieText.innerHTML = info.overview;
   let moviePoster = document.createElement('img');
   let posterURL = `https://image.tmdb.org/t/p/original/${info.poster_path}`;
   moviePoster.setAttribute('src', posterURL);
   moviePoster.setAttribute('id', 'moviePoster');
   movieDiv.appendChild(moviePoster);
   movieDiv.appendChild(movieInfo);
   movieDiv.appendChild(movieText);

}

getGenres()
.then(populateGenreDropdown)
.catch(err => console.error(err));

const showRandomMovie = async() => {
      let movies = await getMovies();
      let randomMovie = await getRandomMovie(movies);
      let info = await getMovieInfo(randomMovie);
      displayMovie(info);
  }
  showRandomMovie();




selectBtn.addEventListener('click', showRandomMovie);