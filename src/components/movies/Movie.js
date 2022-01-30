import React from 'react';

export const Movie = ({ movie }) => {
    return (
    <>
        <div className="overlay"></div>
        <img 
        src={movie.image}
        alt={`${movie.title} Poster`}/>
    </>
  );
};
