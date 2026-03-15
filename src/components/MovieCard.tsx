import { Link } from 'react-router-dom'

type MovieCardProps = {
  title: string
  year: string
  poster: string
  imdbID: string
}

function createSlug(title: string) {
  return title.toLowerCase().replaceAll(' ', '-')
}

function MovieCard({ title, year, poster, imdbID }: MovieCardProps) {
  const hasImage = poster && poster !== 'N/A'
  const slug = createSlug(title)

  return (
    <article className="movie-card">
      <Link to={`/${slug}`} state={{ imdbID }}>
        <figure className="movie-card-img">
          <img
            src={hasImage ? poster : '/no-image.png'}
            alt={`Plakat for ${title}`}
            onError={(e) => { e.currentTarget.src = '/no-image.png' }}
          />
        </figure>
        <section className="movie-card-text">
          <h3>{title}</h3>
          <p>{year}</p>
        </section>
      </Link>
    </article>
  )
}

export default MovieCard
