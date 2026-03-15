import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'

const api_key = '6b4550cc'

function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchtext, setSearchText] = useState('')

  useEffect(() => {
    retrieveMovies('james bond')
  }, [])

  // Hver gang searchtext endres
  useEffect(() => {
    if (searchtext.length > 0 && searchtext.length < 3) return

    if (searchtext.length === 0) {
      retrieveMovies('james bond')
      return
    }

    // debounce så vi ikke sender for mange requests
    // kilde: https://dev.to/mritunjaysaha/enhancing-search-functionality-in-react-with-debouncing-op2
    const wait = setTimeout(() => {
      retrieveMovies(searchtext)
    }, 500)

    return () => clearTimeout(wait)
  }, [searchtext])

  async function retrieveMovies(query) {
    setLoading(true)
    try {
      const answer = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${api_key}`
      )
      const data = await answer.json()

      if (data.Search) {
        setMovies(data.Search)
      } else {
        setMovies([])
      }
    } catch (error) {
      console.error('Noe gikk galt med hentingen:', error)
      setMovies([])
    }
    setLoading(false)
  }

  return (
    <section className="frontpage">
      <h1>Arbeidskrav 3 - Filmsøk i React + OMDb API</h1>

      <SearchBar
        value={searchtext}
        onChange={setSearchText}
      />

      {searchtext.length > 0 && searchtext.length < 3 && (
        <p className="hint">Skriv minst 3 tegn for å søke...</p>
      )}

      {loading ? (
        <p className="status">Henter filmer...</p>
      ) : movies.length === 0 ? (
        <p className="status">Ingen filmer funnet</p>
      ) : (
        <>
          {searchtext.length === 0 && (
            <h2>James Bond-filmer</h2>
          )}
          {searchtext.length >= 3 && (
            <h2>Resultater for "{searchtext}"</h2>
          )}
          <MovieGrid movies={movies} />
        </>
      )}
    </section>
  )
}

export default HomePage
