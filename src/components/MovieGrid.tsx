import MovieCard from './MovieCard'

type Film = {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

type MovieGridProps = {
  movies: Film[]
}

function MovieGrid({ movies }: MovieGridProps) {
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
