import React from 'react';
import LoadingGif from '../../assets/icon/loading.gif';

const Loading = () => {
  return (
    <div className='loading'>
        <h1>Please wait...</h1>
        <h2>The data delivery man is incoming</h2>
        <iframe src={LoadingGif} width="480" height="480" frameBorder="0" className="giphyEmbed" ></iframe>
    </div>
  )
}

export default Loading