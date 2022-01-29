import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/firebaseconfig'
import { ref, set} from "firebase/database"
import { doc, setDoc } from "firebase/firestore"
import { firestore } from '../../firebase/firebaseconfig'

export const Movie = ({ movie }) => {
    const {currentUser} = useAuth()
  
    async function markMoviesAsWatched() {
        // const watchedRef = ref(db, 'watched/' + movie.id + "_" + currentUser.uid)
        const watched = {
            movieId: movie.id,
            userId: currentUser.uid
        }
        // set(watchedRef, watched)
        await setDoc (doc(firestore, "watched", movie.id + "_" + currentUser.uid), watched)
    }

    return (
    <>
        <div>{movie.title}</div>
        <button onClick={markMoviesAsWatched}>Watched</button>
    </>
  );
};
