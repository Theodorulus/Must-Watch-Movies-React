import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/firebaseconfig'
import { ref, set} from "firebase/database"

export const Movie = ({ movie }) => {
    const {currentUser} = useAuth()
  
    function markMoviesAsWatched() {
        const watchedRef = ref(db, 'watched/' + movie.id + "_" + currentUser.uid)
        const watched = {
            movieId: movie.id,
            userId: currentUser.uid
        }
        set(watchedRef, watched)
    }

    return (
    <>
        <div>{movie.title}</div>
        <button onClick={markMoviesAsWatched}>Watched</button>
    </>
  );
};
