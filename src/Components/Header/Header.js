import { NavLink, useNavigate } from "react-router-dom";
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const goForward = () => navigate(1);
    const goBack = () => navigate(-1);

    return (
    <header>
        <nav>
            <NavLink className={({isActive}) => isActive ? "homeLink activeHeaderLink" : "homeLink"} to="/home">Music</NavLink>
            <NavLink className={({isActive}) => isActive ? "searchLink activeHeaderLink" : "searchLink"} to="/search">Search</NavLink>
        </nav>
        <div className="historyBtn">
            <div className="leftHistoryBtn" onClick={goForward}></div>
            <div className="rightHistoryBtn" onClick={goBack}></div>
        </div>
    </header>
  )
}

export default Header