import React from "react";
import "./MovieItem.css";

class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: `https://image.tmdb.org/t/p/original`,
      imageNotFound:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
      isFavorite: false,
    };
  }

  render() {
    return (
      <div className="movie_container">
        {}
        <article>
          <img
            src={
              this.props.movie.poster_path
                ? this.state.path + this.props.movie.poster_path
                : this.state.imageNotFound
            }
            alt={this.props.movie.title}
          />
        </article>

        <h4>{this.props.movie.title}</h4>
        <h4>Release date: {this.props.movie.release_date ? this.props.movie.release_date: 'unknown'}</h4>
        <div className="fav_wrapper">
          <img
            className="fav_icon"
            onClick={() => {
              this.props.addToFavorites(this.props.movie);
              // this.favIconsToggle();
            }}
            style={{
              visibility: /*this.state.isFavorite*/ this.props.checkIfFavorite(
                this.props.movie
              )
                ? "hidden"
                : "visible",
            }}
            src={require("../images/add-to-favorites-icon.png")}
            alt="add to favorites icon"
          />
          <img
            className="unfav_icon"
            onClick={() => {
              this.props.removeFromFavorites(this.props.movie);
              // this.favIconsToggle();
            }}
            style={{
              visibility: /*this.state.isFavorite*/ this.props.checkIfFavorite(
                this.props.movie
              )
                ? "visible"
                : "hidden",
            }}
            src={require("../images/remove-from-favorites-icon.png")}
            alt="remove from favorites icon"
          />
        </div>
      </div>
    );
  }
}
//error handling image not found...?!?!?!?

// Loader for every img???!??! 

export default MovieItem;
