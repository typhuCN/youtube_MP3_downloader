import './SearchBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchType, changeSearchType } from '../../../features/resultsSearchType';
import { fetchSongs, selectSongs } from '../../../features/resultsSongsSlice';
import { fetchArtist } from '../../../features/resultsArtistsSlice';
import { useEffect, useState } from 'react';
import { getArtistId, selectArtistId } from '../../../features/getArtistIdSlice';
import { selectAlbumId } from '../../../features/getAlbumIdSlice';
const SearchBar = () => {
  const dispatch = useDispatch();
  // Creating a new instance to hold the result of fetching songs
  const [result, setResult] = useState(null);
  const [artistId, setArtistId] = useState(null);
  const [albumId, setAlbumId] = useState(null);


  const searchType = useSelector(selectSearchType);
  const songs = useSelector(selectSongs);
  const artistIds = useSelector(selectArtistId);
  const albumIds = useSelector(selectAlbumId);
  
  
  useEffect(() => {
    setResult(songs);
    setArtistId(artistIds);
    setAlbumId(albumIds);
  }, [songs, artistIds, albumIds])


  const changingSearchType = ({target}) => {
    dispatch(changeSearchType(target.value));
  }

  const search = async value => {
    await dispatch(fetchSongs(value));  
    switch (searchType) {
      case 'songs':
        console.log(result);
        break;
      case 'artists':
        dispatch(getArtistId(result));
        console.log(artistId);
        dispatch(fetchArtist(artistId));
        break;
      case 'albums':
        dispatch(getArtistId(result));
        console.log(albumId);
        dispatch(fetchArtist(albumId));
        break;
      default:
        break;
    }
  }

  return (
    <div className='searchBar'>
        <select name='wayToSearch' className='wayToSearch' onChange={changingSearchType}>
            <option value="songs">Songs</option>
            <option value="artists">Artists</option>
            <option value="album">Albums</option>
        </select>
        <input type='text' id='searchHolder' 
        className='searchHolder' 
        placeholder='Search for sth...' 
        onKeyDown={e => {
          if (e.key === 'Enter') {
            search(e.target.value);
          }
        }}/>
        <div className='searchBtn' onClick={() => {
          const searchHolder = document.getElementById('searchHolder');
          search(searchHolder.value);
        }}></div>
    </div>
  )
}

export default SearchBar