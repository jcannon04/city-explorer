function Movies({ movies }) {
  return (
    <div className='mt-2 text-center card p-2'>
    <h1 className=''>Top {movies.length} Movies</h1>
    <ul className='list-group'>
      {movies.map((movie, idx) => {
        return (<li key={idx} className='list-group-item'>
                  <p>Title : {movie.title}</p>
                  <p>Overview: {movie.overview}</p>
                </li>);
      })}
    </ul>
  </div>
  )
}

export default Movies