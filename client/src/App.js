import React, { useState, useEffect } from "react";
import { Route, useHistory} from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import MovieUpdate from './Movies/MovieUpdate';
import AddMovie from './Movies/AddMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

const history = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [history.location.key]);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
      <Route exact path="/update-movie/:id">
        <MovieUpdate getMovieList={getMovieList} />
      </Route>
      <Route exact path="/delete-movie/:id">
        <MovieUpdate movies={getMovieList} />
      </Route>
      <Route exact path="/add-movie">
        <AddMovie />
      </Route>
    </>
  );
};

export default App;
