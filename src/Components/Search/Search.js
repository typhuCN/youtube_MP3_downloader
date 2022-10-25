import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "./SearchBar/SearchBar";
import SearchResult from "./SearchResult/SearchResult";
import { changeBackground } from '../../features/setHeaderBackground';

const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeBackground("none"));
  }, [])

  return (
    <div className="searchContent">
        <SearchBar />
        <SearchResult />
    </div>
  )
}

export default Search