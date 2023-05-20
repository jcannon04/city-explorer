import Movie from './Movie';

function Movies({ movies }) {
  return (
    <div className='mt-2 text-center card p-2'>
    <h1 className=''>Top {movies.length} Movies</h1>
    <ul className='list-group'>
      {movies.map((movie, idx) => {
        return (<Movie movie={movie} idx={idx} />);
      })}
    </ul>
  </div>
  )
}

export default Movies