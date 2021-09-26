import styles from './styles.module.scss'
import { useState ,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import VideoUtils from './../../handler/video/video.utils'
import * as urls from './../../handler/api/apis.url';

const Firm = () =>{
    const [urlCurren,setUrlCurren] = useState("https://www.youtube.com/embed/AeaD3Q-bFjU");

    // xử lý khi thực hiện next chap
    const onNextChap = (url) =>{
        setUrlCurren(url);
    }
    // lấy id bộ phim trên thanh url
    let { id } = useParams();
    const{ GetFilmById,film} = VideoUtils();

    // gọi api để danh sách tập phim
    useEffect(() => {
        GetFilmById(urls.GET_FILM_DETAIL,id);
    }, [id]) 


    // lấy danh sách tập phim 
    const onDisplayChap = () =>{
        let result = null;
        if(film.episodes){
            if(film.episodes.length > 0){
                result = film.episodes.map((cha,index) =>{
                    return  <p key={index} style={{backgroundColor: urlCurren === cha.urlVideo ? "rgb(177, 135, 216)" : "#ccc"}} onClick={() => onNextChap(cha.urlVideo)}>{cha.nameEpisode}</p>
                })
            }
        }
        
        return result;
    }

    return (
        <div>
            {/* <iframe src="https://drive.google.com/file/d/1fYDtEv21CAqLG4VUVH3T4C4hBLRu8qF4/preview" width="640" height="480" allow="autoplay"></iframe> */}
            <iframe style={{marginTop:"44px"}} width="785" height="480" src={urlCurren} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
            <div className={styles.list_chap}>Danh sách tập</div>
            <div className={styles.chap}>
            {onDisplayChap()}
            </div>
        </div>
    )
}
export default Firm;