import './SearchBar.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchType, changeSearchType } from '../../../features/resultsSearchType';
import { changeSongsResult } from '../../../features/resultsSongsSlice';
import { fetchArtist } from '../../../features/resultsArtistsSlice';
import { fetchAlbum } from '../../../features/resultsAlbumsSlice';
const SearchBar = () => {
  const dispatch = useDispatch();
  const searchType = useSelector(selectSearchType);

  const changingSearchType = ({target}) => {
    dispatch(changeSearchType(target.value));
  }

  const search = async value => {
    const options = {
      method: 'GET',
      url: 'https://youtube-music1.p.rapidapi.com/v2/search',
      params: {query: value},
      headers: {
        'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
        'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      const responseSongs = response.data.result.songs;
      switch (searchType) {
        case 'songs':
          dispatch(changeSongsResult(responseSongs));
          break;
        case 'artists':
          const artistIds = [];
          for(const song of responseSongs) {
            for(const artist of song.artists){
              if(artistIds.includes(artist.artist_id)){
                  continue;
              }
              artistIds.push(artist.artist_id);
            }
          }
          // console.log(artistIds);
          dispatch(fetchArtist(artistIds));
          break;
        case 'albums':
          const albumIds = [];
          for(const song of responseSongs) {
            if(!albumIds.includes(song.album.album_id)) {
              albumIds.push(song.album.album_id)
            } 
          }
          // console.log(albumIds);
          dispatch(fetchAlbum(albumIds));
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='searchBar'>
        <select name='wayToSearch' className='wayToSearch' onChange={changingSearchType}>
            <option value="songs">Songs</option>
            <option value="artists">Artists</option>
            <option value="albums">Albums</option>
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