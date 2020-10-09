import React from 'react';
import axios from 'axios';
import MovieList from './Movies/MoviesList'

function Item(props) {
    const { push } = useHistory();
    const { id } = useParams();
  
    const movie = props.movies.find((movie) => `${movie.id}` === id);

  
    const handleDelete = (e) => {
      e.preventDefault();
  
      axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
          console.log( res);
          props.setItems(res.data);
          push(`/api/movies/${id}`);
        })
        .catch((err) => console.error(err));
    };

return (
    <div>
        <Route
        exact
        path="/movie-list/:id"
        render={(props) => <MovieList {...props} movie={movie} />}
      />
      <button
        className="md-button"
        onClick={() => {
          push(`/movie-update/${id}`);
        }}
      >
        Edit
      </button>
      <button className="md-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
)
    }
    export default DeleteMovie;