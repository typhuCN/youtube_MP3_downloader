import './SearchBar.css';
const SearchBar = () => {
  return (
    <div className='searchBar'>
        <select name='wayToSearch' className='wayToSearch'>
            <option value="songs">Songs</option>
            <option value="artists">Artists</option>
            <option value="album">Albums</option>
        </select>
        <input type='text' className='searchHolder' placeholder='Search for sth...' />
        <div className='searchBtn'></div>
    </div>
  )
}

export default SearchBar