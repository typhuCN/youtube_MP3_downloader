import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectArtists } from "../../features/resultsArtistsSlice";
import { useState, useEffect } from "react";
import { changeBackground } from "../../features/setHeaderBackground";
import { download } from "../../subFunc/download";
import './Artist.css'
import Download from '../../assets/icon/download-solid.svg';
import axios from "axios";
import Loading from "../Loading/Loading";
import { selectPadding, changePadding } from "../../features/paddingRightAndLeftSlice";

const Artist = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const artists = useSelector(selectArtists);
    // const singleArtist = useSelector(selectSingleArtist);
    // const singleArtistStatus = useSelector(selectSingleArtistStatus);
    const [currentArtist, setCurrentArtist] = useState(null);
    let loadingHappen = true;
    
    

    useEffect(() => {
        console.log(artists);
        let artistInArtists = false;
        for(const artist of artists){
            if(param.artistName === artist.name){
                // console.log(artist);
                setCurrentArtist(artist);
                artistInArtists = true;
                loadingHappen = false;
            }
        }
        
        if(!artistInArtists){
            const InCaseNoArtist = async artistName => {
                const optionsForGettingArtistId = {
                    method: 'GET',
                    url: 'https://youtube-music1.p.rapidapi.com/v2/search',
                    params: {query: artistName},
                    headers: {
                        'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                        'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                    }
                }
                try {
                    const response = await axios.request(optionsForGettingArtistId);
                    const artistId = response.data.result.songs[0].artists[0].artist_id;
                    const optionsForFetchingArtistId = {
                        method: 'GET',
                        url: 'https://youtube-music1.p.rapidapi.com/v2/get_artist',
                        params: {artist_id: artistId},
                        headers: {
                          'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                          'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                        }
                    };
                    try {
                        const finalResponse = await axios.request(optionsForFetchingArtistId);
                        setCurrentArtist(finalResponse.data.result);
                        loadingHappen = false;
                    } catch (error) {
                        console.log(error);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            InCaseNoArtist(param.artistName)
        }
        dispatch(changePadding('3%'));
    }, [])
    
    useEffect(() => {
        // console.log(currentArtist);
        if(currentArtist){
            dispatch(changeBackground(currentArtist.thumbnail));
        }
        
    }, [currentArtist])
  

    const padding = useSelector(selectPadding);
    
    useEffect(() => {
        const root = document.querySelector(":root");
        root.style.setProperty("--padding-right-and-left", padding);
    }, [padding])

    if(loadingHappen && !currentArtist){
        return <Loading />
    }
    else if(currentArtist){
        console.log(currentArtist)
        return (
        <div className="artistPage">
            <div className="artistDescription">
                <h1>{currentArtist.name}</h1>
                <p>{currentArtist.description}</p>
                
                <h2>Related</h2>
                <div className='searchResult songForArtistPage'>
                {currentArtist.related.map(artist => {
                    return (
                    <div className='result'>
                        <img src={artist.thumbnail} alt="thumbnail" className='openSection'/>
                        <div className='middleSection'>
                            <h3 className="clickable" onClick={() => navigate(`/artist/${artist.title}`, {replace: true})}>{artist.title}</h3>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
            <div className="artistOther">
                <h2>All Hits</h2>
                <div className='searchResult songForArtistPage'>
                    {currentArtist.songs.map(song => {
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
                <h2>Album</h2>
                <div className='searchResult songForArtistPage'>
                    {currentArtist.albums.map(album => {
                        return (
                        <div className='result'>
                            <img src={album.thumbnail} alt="thumbnail" className='openSection'/>
                            <div className='middleSection'>
                                <h3 className="clickable" 
                                onClick={() => navigate(`/album/${album.title}`, {replace: true})}>{album.title}</h3>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
        )
    } else{
        <Loading />
    }
}

export default Artist