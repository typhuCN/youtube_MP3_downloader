import axios from 'axios';

export const download = async(id) => {
    const options = {
        method: 'GET',
        url: 'https://youtube-music1.p.rapidapi.com/get_download_url',
        params: {id: id, ext: 'mp3'},
        headers: {
          'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
          'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        window.open(response.data.result.download_url, '_blank').focus();
    } catch (error) {
        console.log(error);
    }

}