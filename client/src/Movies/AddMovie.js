import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: ["", "", ""],
};

const AddMovie = (props) => {
  const [movie, setMovie] = useState(initialState);

  const handleChanges = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies/")
      .then((res) => {
        console.log("res", res);
        props.setMovies(res.data);
        push("/api/movies/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          placeholder="title"
          value={movie.title}
        />
        <div />

        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="director"
          value={movie.director}
        />
        <div />

        <input
          type="number"
          name="metascore"
          onChange={handleChanges}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div />

        <input
          type="string"
          name="stars"
          onChange={handleChanges}
          placeholder="stars"
          value={movie.stars}
        />
        <div />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default MovieUpdate;
