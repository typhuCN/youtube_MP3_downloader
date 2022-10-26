import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { changeBackground } from "../../features/setHeaderBackground";
import { selectAlbums } from "../../features/resultsAlbumsSlice";
import axios from "axios";
import './Album.css';
import Download from '../../assets/icon/download-solid.svg';
import { download } from "../../subFunc/download";
import { selectPadding, changePadding } from "../../features/paddingRightAndLeftSlice";
import Loading from "../Loading/Loading";

const Album = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const albums = useSelector(selectAlbums);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    let loadingHappen = true;        

    

    useEffect(() => {
        let albumInAlbums = false;
        for(const album of albums){
            if(param.albumName === album.title){
                // console.log(album);
                setCurrentAlbum(album);
                albumInAlbums = true;
                loadingHappen = false;
            }
        }
        if(!albumInAlbums){
            const inCaseNoAlbum = async albumName => {
                const optionForGettingAlbumId = {
                    method: 'GET',
                    url: 'https://youtube-music1.p.rapidapi.com/v2/search',
                    params: {query: albumName},
                    headers: {
                        'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                        'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                    }
                }
        
                try {
                    const response = await axios.request(optionForGettingAlbumId);
                    const albumId = response.data.result.songs[0].album.album_id;
                    const optionsForFetchingAlbumId = {
                        method: 'GET',
                        url: 'https://youtube-music1.p.rapidapi.com/v2/get_album',
                        params: {album_id: albumId},
                        headers: {
                          'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                          'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                        }
                      };
                    try {
                        const finalResponse = await axios.request(optionsForFetchingAlbumId);
                        setCurrentAlbum(finalResponse.data.result);
                        loadingHappen = false;
                    } catch (error) {
                        console.log(error);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            inCaseNoAlbum(param.albumName);
        }
        dispatch(changePadding('20%'));
    }, [])
    
    useEffect(() => {
        // console.log(currentAlbum);
        if(currentAlbum){
            dispatch(changeBackground(currentAlbum.thumbnail));
        }
        
    }, [currentAlbum])
  
    const padding = useSelector(selectPadding);
    useEffect(()=>{
        const root = document.querySelector(':root');
        root.style.setProperty('--padding-right-and-left', padding);
    }, [padding])

    if(loadingHappen && !currentAlbum){
        return <Loading />
    }else if(currentAlbum){
        console.log(currentAlbum);
        return (
        <div className="albumPage">
            <h1>{currentAlbum.title}</h1>
            <h2 className="albumPageArtist clickable">By: {currentAlbum.artists.map(artist => {
                return <p className="artistsInAlbum" onClick={() => navigate(`/artist/${artist.name}`, {replace: true})}>{artist.name}</p>
                })}</h2>
            <h3>year: {currentAlbum.year} | duration: {currentAlbum.duration} min</h3>
            <div className='searchResult onlyAlbumPage'>
                {currentAlbum.songs.map(song => {
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
        </div>
        )
    }
}

export default Album