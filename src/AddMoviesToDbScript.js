import React from 'react';
import { db } from './firebase/firebaseconfig'
import { ref, set, onValue } from "firebase/database"

export const AddMoviesToDbScript = () => {

    function addMovies() {
        const movieList =[]

        let movies = fetch("https://imdb-api.com/en/API/IMDbList/k_doajslx8/ls507608306") 
               .then(response => response.json())
               .then(data => {
                    let movies = data.items
                
                     for(let index in movies){
                         let movie = movies[index]
                         let director = movie.description.split(' (dir.)')[0]
                         addMovie(movie.id, movie.title, movie.year, movie.image, movie.imDbRating, director)
                     }

                     let movie = movies[1]
                    console.log(movie.id)
                    console.log(movie.title)
                    console.log(movie.year)
                    console.log(movie.image)
                    console.log(movie.imDbRating)
                    console.log(movie.description.split(' (dir.)')[0])
               });
    }

    function addMovie(movieId, movieTitle, releaseYear, imageUrl, rating, movieDirector) {
        const movieRef = ref(db, 'movies/' + movieId)
        const movie = {
            id: movieId, 
            title: movieTitle,
            year: releaseYear,
            image: imageUrl,
            imDbRating: rating,
            director: movieDirector
        }
        set(movieRef, movie)
    }

    return <button onClick={addMovies}>Add Movies</button>;
};
