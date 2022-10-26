import LoadingGif from '../../assets/icon/loading.gif';
import './Loading.css'

const Loading = () => {
  return (
    <div className='loading'>
        <h1>Please wait...</h1>
        <h2>The data delivery man is incoming</h2>
        <img src={LoadingGif} alt="Loading"/>
    </div>
  )
}

export default Loading