import MovieCard from './MovieCard'

function MovieGrid({ movies }) {
  return (
    <section className="movie-grid">
      {movies.map((film) => (
        <MovieCard
          key={film.imdbID}
          title={film.Title}
          year={film.Year}
          poster={film.Poster}
          imdbID={film.imdbID}
        />
      ))}
    </section>
  )
}

export default MovieGrid
