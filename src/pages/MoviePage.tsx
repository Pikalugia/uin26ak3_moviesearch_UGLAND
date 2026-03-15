import { useParams, useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const API_KEY = '6b4550cc'

type movieDetails = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Actors: string
  Plot: string
  Poster: string
  imdbRating: string
  imdbID: string
  Response: string
}

function MoviePage() {
  const { movie } = useParams()
  const location = useLocation()
  const [movie_info, setMovie] = useState<movieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function retrieveMovie() {
      setLoading(true)
      setError('')

      const state = location.state as { imdbID?: string } | null
      let url: string

      if (state?.imdbID) {
        // bruker imdbID om vi har det
        url = `https://www.omdbapi.com/?i=${state.imdbID}&plot=full&apikey=${API_KEY}`
      } else {
        const tittel = movie?.replace(/-/g, ' ') || ''
        url = `https://www.omdbapi.com/?t=${encodeURIComponent(tittel)}&apikey=${API_KEY}`
      }

      try {
        const answer = await fetch(url)
        const data = await answer.json()

        if (data.Response === 'True') {
          setMovie(data)
        } else {
          setError('Fant ikke filmen')
        }
      } catch {
        setError('Klarte ikke å hente filmdata')
      }
      setLoading(false)
    }

    retrieveMovie()
  }, [movie, location.state])

  if (loading) {
    return (
      <section className="movie-page">
        <p className="status">Laster filmdetaljer...</p>
      </section>
    )
  }

  if (error || !movie_info) {
    return (
      <section className="movie-page">
        <p className="status">{error || 'Noe gikk galt'}</p>
        <Link to="/" className="back-button">Tilbake til forsiden</Link>
      </section>
    )
  }

  const harPoster = movie_info.Poster !== 'N/A'

  return (
    <section className="movie-page">
      <Link to="/" className="back-button">← Tilbake</Link>

      <article className="movie-details">
        <figure className="movie-img-large">
          <img
            src={harPoster ? movie_info.Poster : '/no-image.png'}
            alt={`Plakat for ${movie_info.Title}`}
            onError={(e) => { e.currentTarget.src = '/no-image.png' }}
          />
        </figure>

        <section className="movie-info">
          <h1>{movie_info.Title}</h1>
          <p className="movie-meta">
            {movie_info.Year} • {movie_info.Runtime} • {movie_info.Rated}
          </p>

          <p className="movie-genre">{movie_info.Genre}</p>

          <p className="movie-plot">{movie_info.Plot}</p>

          <dl className="movie-facts">
            <dt>Regissør</dt>
            <dd>{movie_info.Director}</dd>

            <dt>Skuespillere</dt>
            <dd>{movie_info.Actors}</dd>

            <dt>IMDB-vurdering</dt>
            <dd>{movie_info.imdbRating}/10</dd>

            <dt>Utgivelsesdato</dt>
            <dd>{movie_info.Released}</dd>
          </dl>
        </section>
      </article>
    </section>
  )
}

export default MoviePage
