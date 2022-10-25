import React from 'react';
import Download from '../../../assets/icon/download-solid.svg';
import './SearchResult.css';
import { useSelector } from 'react-redux';
import { selectSearchType } from '../../../features/resultsSearchType';
import { selectSongs } from '../../../features/resultsSongsSlice';
import { selectArtists } from '../../../features/resultsArtistsSlice';
import { selectAlbums } from '../../../features/resultsAlbumsSlice';
import { useNavigate } from 'react-router-dom';
import { download } from '../../../subFunc/download';

const SearchResult = () => {    
    const navigate = useNavigate();

    const resultType = useSelector(selectSearchType);
    const songs = useSelector(selectSongs);
    const artists = useSelector(selectArtists);
    const albums = useSelector(selectAlbums);

    /*
    
    Important thing to note is that the searchResult className
    And its child classes are not specify for 
    Only the searchResult it's also use for detailed information
    in Artist and Album components.

    */

    if(resultType === 'songs'){
        return (
            <div className='searchResult'>
                {songs.map(song => {
                    return (
                    <div className='result'>
                        <img src={song.thumbnail} alt="thumbnail" className='openSection'/>
                        <div className='middleSection'>
                            <h3>{song.name}</h3>
                            <ul>
                                {song.artists.map((artist, index) => {
                                    return <li key={`${song.name}-${index}`}>{artist.name}</li>
                                })}
                            </ul>
                        </div>
                        <div className='endSection'>
                            <img src={Download} 
                            alt="download-btn" 
                            onClick={() => {
                                download(song.id);
                            }}/>
                        </div>
                    </div>
                    )
                })}
            </div>
        )
    } else if(resultType === 'artists'){
        return(
            <div className='searchResult'>
                {artists.map(artist => {
                    return (
                    <div className='result'>
                        <img src={artist.thumbnail} alt="thumbnail" className='openSection'/>
                        <div className='middleSection'>
                            <h3 onClick={() => navigate(`/artist/${artist.name}`, {replace: true})}>{artist.name}</h3>
                        </div>
                    </div>
                    )
                })}
            </div>
        )
    } else if(resultType === 'albums'){ 
        return(
            <div className='searchResult'>
                {albums.map(album => {
                    return (
                    <div className='result'>
                        <img src={album.thumbnail} alt="thumbnail" className='openSection'/>
                        <div className='middleSection'>
                            <h3 onClick={() => navigate(`/album/${album.title}`, {replace: true})}>{album.title}</h3>
                            <ul>
                                {album.artists.map((artist, index) => {
                                    return <li key={`${album.name}-${index}`}>{artist.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    )
                })}
            </div>
        )
    }

    
}

export default SearchResult