import React,{useEffect} from 'react'
import VideoUtils from './../../handler/video/video.utils';
import * as urls from './../../handler/api/apis.url';
const DetailFilm = ({id}) => {
    const {GetFilmById,film} = VideoUtils();
    useEffect(() => {
        if(id !== 0){
        GetFilmById(urls.GET_FILM_DETAIL,id);
    }   
    }, [id])
    return (
        <div>
           <h1>Tên Phim : {film?.nameFilm}</h1>
           <p>Đường dẫn :</p>
           <p>Tên quốc gia :</p>
           <p>Thể loai :</p>
           <p>Lượt xem :</p>
           <p></p>
           <p></p>
           <p></p>
           <p></p>
           <p></p>
           <p></p>
        </div>
    )
}

export default DetailFilm
