import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Movie as MovieCard } from './Movie'
import { AddMoviesToDbScript } from '../../AddMoviesToDbScript';
import { firestore } from '../../firebase/firebaseconfig'
import { collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';

export const Watchlist = () => {
    const [watchList, setWatchList] = useState([])
    const {currentUser} = useAuth()

    async function getWatchList() {
        const watchedList = (await(getDocs(query(collection(firestore, "watched"), where("userId", "==", currentUser.uid))))).docs.map(doc => doc.data()["movieId"])
        const movies = (await(getDocs(query(collection(firestore, "movies")/*, where("id", "in", watchedList)*/)))).docs.map(doc => doc.data())

        const watchedMovies = movies.filter(function(value) {
            return watchedList.includes(value.id)
        })
        
        const watchedMoviesIds = watchedMovies.map(movie => movie.id)
        const moviesWatchList = movies.filter(function(value){
            return !watchedMoviesIds.includes(value.id)
        })

        moviesWatchList.sort(function(m1, m2) {
            if (m1.title < m2.title) {
                return -1
            } else {
                return 1
            }
        })

        setWatchList(moviesWatchList) 
    }

    useEffect(() => {
        getWatchList()
        // console.log(watchList)
    }, [])

    async function markMovieAsWatched(movie) {
        const watched = {
            movieId: movie.id,
            userId: currentUser.uid
        }

        await setDoc (doc(firestore, "watched", movie.id + "_" + currentUser.uid), watched)

        // remove movie from the list
        const moviesWatchList = watchList.filter(function(value){
            return value.id != movie.id
        })
        setWatchList(moviesWatchList)
    }

    return (
    <>
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Watchlist</h1>

          <span className="count-pill">
            {watchList.length} {watchList.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        <div className="movie-grid">
        {watchList.map((movie) => (
            <div className='movie-card' key={movie.id + "div"}>
                <button className="ctrl-btn" onClick={() => markMovieAsWatched(movie) } key={movie.id + "b"}>
                    <MovieCard movie={movie} key={movie.id}/>
                </button>
            </div>
        ))}
        </div>
        
      </div>
    </div>
    </>
  );
};
