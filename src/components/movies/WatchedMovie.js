import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/firebaseconfig'
import { ref, set} from "firebase/database"
import { doc, setDoc, deleteDoc } from "firebase/firestore"
import { firestore } from '../../firebase/firebaseconfig'

export const WatchedMovie = ({ movie }) => {
    const {currentUser} = useAuth()
  
    async function markMoviesAsUnwatched() {
        // const watchedRef = ref(db, 'watched/' + movie.id + "_" + currentUser.uid)
        const watched = {
            movieId: movie.id,
            userId: currentUser.uid
        }
        // set(watchedRef, watched)
        await deleteDoc (doc(firestore, "watched", movie.id + "_" + currentUser.uid))
    }

    return (
    <>
        <div>{movie.title}</div>
        <button onClick={markMoviesAsUnwatched}>Unwatch</button>
    </>
  );
};
