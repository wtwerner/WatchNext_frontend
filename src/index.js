document.addEventListener("DOMContentLoaded", function(event){
    console.clear()

    const BACKEND_URL = 'http://localhost:3000';
    const TMDB_URL = 'https://api.themoviedb.org/3/movie/';
    const IMG_URL = 'https://image.tmdb.org/t/p/w200';
    const TMDB_APPEND = '?api_key=462158256aa6d5d3eab60e67dcecfde2'


    const form = document.getElementById('form');
    const search = document.getElementById('movie-search');

    class Movie {
        constructor(tmdb_id, title, year, poster_url, watched, to_watch, rating) {
            this.tmdb_id = tmdb_id;
            this.title = title;
            this.year = year;
            this.poster_url = poster_url;
            this.watched = watched;
            this.to_watch = to_watch;
            this.rating = rating;
        }
    }
    
    form.addEventListener('click', function(event) {
        event.preventDefault();

        let input = search.value;

        console.log(input);
        search.value = '';

        // if (input) {
        //     showMovies(TMDB_URL + input);
        //     search.value = "";
        // }
    }, false);

    function createMovieCard(movie) {
        let main = document.getElementById("main");
        let div = document.createElement("div");
        let pTag = document.createElement("p");
        let img = document.createElement("img");
        //add real image source
        img.src = IMG_URL + movie.poster_path;
        div.className = "card";
        pTag.innerHTML = movie.title
    
        let watchedButton = document.createElement("button")
        watchedButton.innerHTML = "Watched"
        watchedButton.className = "button is-small"

        let removeButton = document.createElement("button")
        removeButton.innerHTML = "Remove"
        removeButton.className = "button is-small"
        
        div.appendChild(img)
        div.appendChild(pTag)
        div.appendChild(watchedButton)
        div.appendChild(removeButton)
        main.appendChild(div)
    }

    function fetchMovies() {
        return fetch(BACKEND_URL+'/movies')
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            let movies = json['data']
            fetchMovieData(movies)
        })
    }

    function fetchMovieData(movies) {
        movies.forEach(movie => {
            return fetch(TMDB_URL+movie.attributes.tmdb_id+TMDB_APPEND)
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                createMovieCard(json)
            })
        })
    }

    fetchMovies()
});


//fetch tracked movie tmdb_ids --> rails
//fetch movie data using tmdb_ids --> tmdb
//make cards uring movie data