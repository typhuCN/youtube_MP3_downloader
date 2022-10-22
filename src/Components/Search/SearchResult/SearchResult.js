import React from 'react';
import Download from '../../../assets/icon/download-solid.svg';
import './SearchResult.css';
import { useSelector } from 'react-redux';
import { selectSearchType } from '../../../features/resultsSearchType';
import { selectSongs } from '../../../features/resultsSongsSlice';
import { selectArtists } from '../../../features/resultsArtistsSlice';
import { selectAlbums } from '../../../features/resultsAlbumsSlice';
import axios from 'axios';

const SearchResult = () => {
    const resultType = useSelector(selectSearchType);
    const songs = useSelector(selectSongs);
    const artists = useSelector(selectArtists);
    const albums = useSelector(selectAlbums);

    const download = async(id) => {
        const options = {
            method: 'GET',
            url: 'https://youtube-music1.p.rapidapi.com/get_download_url',
            params: {id: id, ext: 'mp3'},
            headers: {
              'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
              'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            window.open(response.data.result.download_url, '_blank').focus();
        } catch (error) {
            console.log(error);
        }

    }

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
}

export default SearchResult