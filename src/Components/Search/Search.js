import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar/SearchBar";
import SearchResult from "./SearchResult/SearchResult";
import { changeBackground } from '../../features/setHeaderBackground';
import { selectPadding, changePadding } from "../../features/paddingRightAndLeftSlice";

const Search = () => {
  const dispatch = useDispatch();
  const padding = useSelector(selectPadding);
  const root = document.querySelector(':root');

  useEffect(() => {
    dispatch(changeBackground("none"));
    dispatch(changePadding("20%"));
    root.style.setProperty('--padding-right-and-left', padding);
  }, [padding])
  
  

  return (
    <div className="searchContent">
        <SearchBar />
        <SearchResult />
    </div>
  )
}

export default Search