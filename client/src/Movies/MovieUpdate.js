import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    id: 5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
  }

  const MovieUpdate = (props) => {
      const [movie, setMovies] = useState(initialState);
      const { id } = useParams();
      const { push } = useHistory();
  

  useEffect (() => {
      axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
          console.log("res", res);
          setMovies(res.data)
      })
      .catch((err) => console.log(err))
  })
  const handleChanges = (e) => {
    setMovies({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log("res", res);
        props.setMovies(res.data);
        push(`/api/movies/${id}`);
      })
      .catch((err) => console.error(`unable to update ${id}: `, err));
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
        <div/>

        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="director"
          value={movie.director}
        />
        <div/>

        <input
          type="number"
          name="metascore"
          onChange={handleChanges}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div/>

        <input
          type="string"
          name="stars"
          onChange={handleChanges}
          placeholder="stars"
          value={movie.stars}
        />
        <div/>

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default MovieUpdate;

