import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Movie as MovieCard } from './Movie'
import { firestore } from '../../firebase/firebaseconfig'
import { collection, getDocs, query, where, DocumentData, getDoc, doc, deleteDoc } from 'firebase/firestore';

export const Watched = () => {
    const [watchedMoviesList, setWatchedMoviesList] = useState([])
    const {currentUser} = useAuth()


    async function getWatchedList() {
        const watchedList = (await(getDocs(query(collection(firestore, "watched"), where("userId", "==", currentUser.uid))))).docs.map(doc => doc.data()["movieId"])
        const movies = (await(getDocs(query(collection(firestore, "movies")/*, where("id", "in", watchedList)*/)))).docs.map(doc => doc.data())
        
        const watchedMovies = movies.filter(function(value) {
            return watchedList.includes(value.id)
        })

        watchedMovies.sort(function(m1, m2) {
            if (m1.title < m2.title) {
                return -1
            } else {
                return 1
            }
        })
        // console.log(watchedMovies)
        setWatchedMoviesList(watchedMovies) 
    }

    useEffect(() => {
        getWatchedList()
    }, [])

    async function markMovieAsUnwatched(movie) {
        const watched = {
            movieId: movie.id,
            userId: currentUser.uid
        }
        await deleteDoc (doc(firestore, "watched", movie.id + "_" + currentUser.uid))

        // remove movie from the list
        const watchedMovies = watchedMoviesList.filter(function(value){
            return value.id != movie.id
        })
        setWatchedMoviesList(watchedMovies)
    }

    return (
    <>
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Watched movies</h1>

          <span className="count-pill">
            {watchedMoviesList.length} {watchedMoviesList.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        <div className="movie-grid">
        {watchedMoviesList.map((movie) => (
            <div className='movie-card' key={movie.id + "div"}>
                <a className="btn btn-warning w-100 mb-3" href={"https://www.imdb.com/title/" + movie.id}>
                    IMDb
                </a>
                <button className="ctrl-btn poster" onClick={() => markMovieAsUnwatched(movie) } key={movie.id + "b"}>
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
