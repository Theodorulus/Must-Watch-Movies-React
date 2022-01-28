import React, { useEffect, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebaseconfig'
import { ref, set, onValue, get, child } from "firebase/database"
import { Movie } from './Movie'
import { AddMoviesToDbScript } from '../../AddMoviesToDbScript';

export const Watchlist = () => {
    const [movieList, setMovieList] = useState([])
    const [isInitialRender, setIsInitialRender] = useState(true);
    const {currentUser} = useAuth()

    

    

    useEffect(() => {
        function getAllMovies(){
            const moviesRef = ref(db, 'movies')
            const movies = []
            onValue(moviesRef, (snapshot) => {
                const data = snapshot.val()
                for(let index in data) {
                    movies.push(data[index])
                }
            })
    
            movies.sort(function(m1, m2) {
                if (m1.title < m2.title) {
                    return -1
                } else {
                    return 1
                }
            })
            return movies
        }

        function getWatchedMovies() {
            const watchedRef = ref(db, 'watched')
            const watchedMovies = []
            onValue(watchedRef, (snapshot) => {
                const data = snapshot.val()
                for(let index in data) {
                    if (data[index].userId === currentUser.uid) {
                        onValue(ref(db, '/movies/' + data[index].movieId), (snapshot1) => {
                            watchedMovies.push(snapshot1.val())
                        }, {onlyOnce: true})
                    }
                }
            })
            return watchedMovies
        }

        let watchedMoviesIds = getWatchedMovies().map(movie => movie.id)
        let unwatchedMovies = getAllMovies().filter(function(value){
            return !watchedMoviesIds.includes(value.id)
        })
        setMovieList(unwatchedMovies)
        // console.log(movieList)//
    }, []);

    return (
    <>
        <h1> Watchlist </h1>
        <div>
            {/* {movieList ? movieList.map(movie => 
                <Movie movie={movie} key={movie.id}/>
            ) : ''} */}
            {movieList.length}
            {movieList.map(movie => 
                <Movie movie={movie} key={movie.id}/>
            )}
        </div>
        {/*// <AddMoviesToDbScript/> /*/}
    </>
  );
};
