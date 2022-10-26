import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBackground } from '../../features/setHeaderBackground';
import './Home.css';
import { selectPadding, changePadding } from '../../features/paddingRightAndLeftSlice';


const Home = () => {
  const dispatch = useDispatch();
  const padding = useSelector(selectPadding);
  const root = document.querySelector(':root');

  useEffect(() => {
    dispatch(changeBackground("none"));
    dispatch(changePadding('20%'));
    root.style.setProperty('--padding-right-and-left', padding);
  }, [padding])
  

  return (
    <div className="homePage">
        <h1>Welcome to music downloader</h1>
        <p>This is a music open source, where you can find your favorite singers, their songs and download it for free.</p>
        <p>This is a free open source using public api so it'll sometime get stuck at some point...</p>
        <h2>Download instruction</h2>
        <ol className="downloadInstruction">
            <li>Click Search which available at the top of our website.</li>
            <li>Then a search bar will appear, type in the search bar and click enter or you can use the little magnifying glass.</li>
            <li>There we go, the search result appear right below the search bar. Click on the download button to install!!!</li>
        </ol>
    </div>
  )
}

export default Home
