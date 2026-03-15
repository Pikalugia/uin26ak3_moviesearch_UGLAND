type SearchBarProps = {
  value: string
  onChange: (newValue: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="movie-search">Søk etter film:</label>
      <input
        id="movie-search"
        type="search"
        placeholder="f.eks. Flåklypa Grand Prix, Max Manus..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  )
}

export default SearchBar
