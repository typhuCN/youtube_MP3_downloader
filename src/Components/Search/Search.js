import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar/SearchBar";
import SearchResult from "./SearchResult/SearchResult";
import { changeBackground } from '../../features/setHeaderBackground';
import { selectPadding, changePadding } from "../../features/paddingRightAndLeftSlice";

const Search = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(changeBackground("none"));
    dispatch(changePadding("20%"));
  }, [])
  
  // const padding = useSelector(selectPadding);
  // const main = document.querySelector('.main');
  // main.style.paddingRight = padding;
  // main.style.paddingLeft = padding;

  return (
    <div className="searchContent">
        <SearchBar />
        <SearchResult />
    </div>
  )
}

export default Search