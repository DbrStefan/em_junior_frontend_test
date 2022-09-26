import React from "react";
import MovieItem from "./MovieItem";
import "./MovieList.css";

const MovieList = (props) => {
  const renderList = props.movies.map((movie) => {
    return (
      <MovieItem
        key={movie.id}
        movie={movie}
        addToFavorites={props.addToFavorites}
        removeFromFavorites={props.removeFromFavorites}
        checkIfFavorite={props.checkIfFavorite}
      />
    );
  });
  const renderFavoritesList = props.favMovies.map((movie) => {
    return (
      <MovieItem
        key={movie.id}
        movie={movie}
        addToFavorites={props.addToFavorites}
        removeFromFavorites={props.removeFromFavorites}
        checkIfFavorite={props.checkIfFavorite}
      />
    );
  });

  if (props.favoriteMoviesOn) {
    return <div className="movie_list">{renderFavoritesList} </div>;
  } else {
    return <div className="movie_list">{renderList}</div>;
  }
};

export default MovieList;
