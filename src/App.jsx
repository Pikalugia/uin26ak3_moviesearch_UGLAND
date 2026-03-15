import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:movie" element={<MoviePage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
