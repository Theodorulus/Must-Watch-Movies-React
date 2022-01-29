import React, { useEffect, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebaseconfig'
import { ref, set, onValue, get, child } from "firebase/database"
import { Movie } from './Movie'
import { AddMoviesToDbScript } from '../../AddMoviesToDbScript';
import { firestore } from '../../firebase/firebaseconfig'
import { collection, getDocs, query, where, DocumentData, getDoc, doc } from 'firebase/firestore';

export const Watchlist = () => {
    const [movieList, setMovieList] = useState([])
    const [watchList, setWatchList] = useState([])
    const [isInitialRender, setIsInitialRender] = useState(true);
    const {currentUser} = useAuth()

    
    async function getAllMovies() {
        const movies = (await(getDocs(query(collection(firestore, "movies"))))).docs.map(doc => doc.data())
        movies.sort(function(m1, m2) {
            if (m1.title < m2.title) {
                return -1
            } else {
                return 1
            }
        })
        setMovieList(movies)
        
        // const moviesRef = firestore.collection("movies")
        // moviesRef.onSnapshot( (moviesSnapshot) => {
        //     const movies = []
        //     moviesSnapshot.forEach((doc) => {
        //         movies.push(doc.data())
        //     })
        //     movies.sort(function(m1, m2) {
        //         if (m1.title < m2.title) {
        //             return -1
        //         } else {
        //             return 1
        //         }
        //     })
        //     setMovieList(movies)
        // })
    }

    async function getWatchList() {
        const watchedList = (await(getDocs(query(collection(firestore, "watched"), where("userId", "==", currentUser.uid))))).docs.map(doc => doc.data()["movieId"])
        const watchedMovies = (await(getDocs(query(collection(firestore, "movies"), where("id", "in", watchedList))))).docs.map(doc => doc.data())
        
        const watchedMoviesIds = watchedMovies.map(movie => movie.id)
        const moviesWatchList = movieList.filter(function(value){
            return !watchedMoviesIds.includes(value.id)
        })
        // watchedMovies.sort(function(m1, m2) {
        //     if (m1.title < m2.title) {
        //         return -1
        //     } else {
        //         return 1
        //     }
        // })
        // console.log(moviesWatchList)
        setWatchList(moviesWatchList) 
    }

    useEffect(() => {
        getAllMovies()
        // console.log(movieList)
        getWatchList()
        // console.log(watchList)
    }, [watchList]) //

    // console.log(watchList)
    // console.log(movieList)
    // useEffect(() => {//
    //     function getAllMovies(){
    //         const moviesRef = ref(db, 'movies')
    //         // const movies = []
    //         onValue(moviesRef, (snapshot) => {
    //             const data = snapshot.val()
    //             for(let index in data) {
    //                 // movies.push(data[index])
    //                 let movies = movieList
    //                 movies.push(data[index])
    //                 setMovieList(movies)
    //             }
    //         })
            
    //         let movies = movieList

    //         movies.sort(function(m1, m2) {
    //             if (m1.title < m2.title) {
    //                 return -1
    //             } else {
    //                 return 1
    //             }
    //         })
    //         console.log(movies)
    //         return movies
    //     }

    //     function getWatchedMovies() {
    //         const watchedRef = ref(db, 'watched')
    //         const watchedMovies = []
    //         onValue(watchedRef, (snapshot) => {
    //             const data = snapshot.val()
    //             for(let index in data) {
    //                 if (data[index].userId === currentUser.uid) {
    //                     onValue(ref(db, '/movies/' + data[index].movieId), (snapshot1) => {
    //                         watchedMovies.push(snapshot1.val())
    //                     }, {onlyOnce: true})
    //                 }
    //             }
    //         })
    //         return watchedMovies
    //     }

    //     // let watchedMoviesIds = getWatchedMovies().map(movie => movie.id)
    //     // let unwatchedMovies = getAllMovies().filter(function(value){
    //     //     return !watchedMoviesIds.includes(value.id)
    //     // })
    //     let unwatchedMovies = getAllMovies()
    //     console.log(unwatchedMovies)
    //     setMovieList(unwatchedMovies)
    //     // console.log(movieList)//
    // }, []);

    return (
    <>
        <h1> Watchlist </h1>
        <div>
            {/* {movieList ? movieList.map(movie => 
                <Movie movie={movie} key={movie.id}/>
            ) : ''} */}
            {watchList.length}
            {watchList.map(movie => 
                <Movie movie={movie} key={movie.id}/>
            )}
        </div>
        {/* <AddMoviesToDbScript/> */}
    </>
  );
};
