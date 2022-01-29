import React, { useEffect, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebaseconfig'
import { ref, set, onValue, get, child } from "firebase/database"
import { WatchedMovie } from './WatchedMovie'
import { AddMoviesToDbScript } from '../../AddMoviesToDbScript';
import { firestore } from '../../firebase/firebaseconfig'
import { collection, getDocs, query, where, DocumentData, getDoc, doc } from 'firebase/firestore';

export const Watched = () => {
    const [watchedMoviesList, setWatchedMoviesList] = useState([])
    const {currentUser} = useAuth()


    async function getWatchedList() {
        const watchedList = (await(getDocs(query(collection(firestore, "watched"), where("userId", "==", currentUser.uid))))).docs.map(doc => doc.data()["movieId"])
        const watchedMovies = (await(getDocs(query(collection(firestore, "movies"), where("id", "in", watchedList))))).docs.map(doc => doc.data())
        
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
    }, [watchedMoviesList]) 


    return (
    <>
        <h1> Watchlist </h1>
        <div>
            {/* {movieList ? movieList.map(movie => 
                <Movie movie={movie} key={movie.id}/>
            ) : ''} */}
            {watchedMoviesList.length}
            {watchedMoviesList.map(movie => 
                <WatchedMovie movie={movie} key={movie.id}/>
            )}
        </div>
    </>
  );
};
