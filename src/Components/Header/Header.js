import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { selectImage } from "../../features/setHeaderBackground";
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const backgroundImage = useSelector(selectImage);
    const root = document.querySelector(':root');

    useEffect(() => {
        if(backgroundImage === "none"){
            root.style.setProperty('--header-height', '100px');
        } else{
            root.style.setProperty('--header-height', '200px');
        }
    }, [backgroundImage])

    return (
    <header style={{backgroundImage: `url(${backgroundImage})`}}>
        <nav>
            <NavLink className={({isActive}) => isActive ? "homeLink activeHeaderLink" : "homeLink"} to="/home">Music</NavLink>
            <NavLink className={({isActive}) => isActive ? "searchLink activeHeaderLink" : "searchLink"} to="/search">Search</NavLink>
        </nav>
        <div className="historyBtn">
            <div className="leftHistoryBtn" onClick={() => {navigate(-1)}}></div>
            <div className="rightHistoryBtn" onClick={() => {navigate(1)}}></div>
        </div>
    </header>
  )
}

export default Header