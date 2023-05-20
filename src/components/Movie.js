function Movie({ movie, idx }) {
  return (
    <li key={idx} className='list-group-item'>
      <p>Title : {movie.title}</p>
      <p>Overview: {movie.overview}</p>
    </li>
  );
}

export default Movie;
