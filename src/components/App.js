import React from "react";

import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import tmbd from "../apis/tmdb";
import "./App.css";

class App extends React.Component {
  state = {
    movies: [],
    favMovies: [],
    favoriteMoviesOn: false,
    isLoading: false,
    favButton: false,
    moviesButton: true,
    currentPage: 1,
    totalPages: 0,
    term: "",
  };

  componentDidMount() {
    this.onFormSubmit("star wars");
  }

  onFormSubmit = async (searchTerm, page) => {
    this.setState({ isLoading: true });
    if (searchTerm !== this.state.term) {
      this.setState({ currentPage: 1, term: searchTerm });
    }
    const data = await tmbd.search(searchTerm, page);
    setTimeout(() => {
      this.setState({
        movies: data.results,
        totalPages: data.total_pages,
        isLoading: false,
      });
    }, 1); // To test the loader
    if (this.state.favoriteMoviesOn) {
      this.setState({
        favoriteMoviesOn: false,
        favButton: false,
        moviesButton: true,
      });
    }
  };

  addToFavorites = (movie) => {
    if (this.state.favMovies.length === 0) {
      this.setState({ favMovies: [...this.state.favMovies, movie] });
    } else {
      let i = 0;

      do {
        if (movie.id !== this.state.favMovies[i].id) {
          this.setState({ favMovies: [...this.state.favMovies, movie] });
        }
        i++;
      } while (i < this.state.favMovies.length);
    }
  };

  removeFromFavorites = (movie) => {
    let idx = 0;
    for (let i = 0; i < this.state.favMovies.length; i++) {
      if (movie.id === this.state.favMovies[i].id) {
        idx = i;
      }
    }
    if (idx !== -1) {
      const filteredArr = this.state.favMovies.filter((_, i) => {
        return i !== idx;
      });

      this.setState({ favMovies: filteredArr });
    }
  };

  checkIfFavorite = (movie) => {
    if (this.state.favMovies.length === 0) {
      return false;
    } else {
      for (let i = 0; i < this.state.favMovies.length; i++) {
        if (movie.id === this.state.favMovies[i].id) {
          return true;
        }
      }
      return false;
    }
  };

  toggleFavoriteMovies = () => {
    if (!this.state.favoriteMoviesOn) {
      this.setState({
        favoriteMoviesOn: true,
        favButton: true,
        moviesButton: false,
      });
    } else {
      this.setState({
        favoriteMoviesOn: false,
        favButton: false,
        moviesButton: true,
      });
    }
    // event.currentTarget.disabled = true
    // You still have to think some more for the logic of the second button
  };

  nextPage = async (page) => {
    await this.setState({ currentPage: page });
    this.onFormSubmit(this.state.term, this.state.currentPage);
  };

  render() {
    return (
      <div className="App">
        <div className="nav">
          <SearchBar
            onFormSubmit={this.onFormSubmit}
            movies={this.state.movies}
          />

          <button
            onClick={this.toggleFavoriteMovies}
            disabled={this.state.moviesButton}
            className="button"
          >
            Movies
          </button>
          <button
            onClick={this.toggleFavoriteMovies}
            disabled={this.state.favButton}
            className="button"
          >
            Favorite movies
          </button>
        </div>

        {this.state.isLoading ? (
          <LoadingSpinner />
        ) : (
          <MovieList
            movies={this.state.movies}
            favMovies={this.state.favMovies}
            favoriteMoviesOn={this.state.favoriteMoviesOn}
            addToFavorites={this.addToFavorites}
            removeFromFavorites={this.removeFromFavorites}
            checkIfFavorite={this.checkIfFavorite}
          />
        )}

        {this.state.totalPages > 1 && !this.state.favoriteMoviesOn ? (
          <Pagination
            pages={this.state.totalPages}
            nextPage={this.nextPage}
            currentPage={this.state.currentPage}
            favoriteMoviesOn={this.state.favoriteMoviesOn}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
