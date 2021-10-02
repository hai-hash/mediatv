import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import filmApi from '../../api/film/filmApi';
const Firm = () => {
    const [urlCurren, setUrlCurren] = useState("https://www.youtube.com/embed/AeaD3Q-bFjU");

    const [episodes, setEpisodes] = useState([]);

    // xử lý khi thực hiện next chap
    const onNextChap = (url) => {
        setUrlCurren(url);
    }
    // lấy id bộ phim trên thanh url
    let { id } = useParams();


    // gọi api để danh sách tập phim
    useEffect(() => {
        const getEpisode = async () => {
            try {
                const res = await filmApi.getepisode(id);
                setEpisodes(res);
            } catch (error) {
                console.log(error);
            }
        }
        getEpisode();
    }, [id])


    // lấy danh sách tập phim 
    const onDisplayChap = () => {
        let result = null;
        if (episodes.length > 0) {
            result = episodes.map((cha, index) => {
                return <p key={index} style={{ backgroundColor: urlCurren === cha.urlVideo ? "rgb(177, 135, 216)" : "#ccc" }} onClick={() => onNextChap(cha.urlVideo)}>{cha.nameEpisode}</p>
            })
        }
        return result;
    }

    return (
        <div>
            <iframe src={urlCurren} title="Video player" width="785" height="480" allow="autoplay" allowFullScreen={true}></iframe>
            {/* <iframe style={{ marginTop: "44px" }} width="785" height="480" src={urlCurren} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe> */}
            <div className={styles.list_chap}>Danh sách tập</div>
            <div className={styles.chap}>
                {onDisplayChap()}
            </div>
        </div>
    )
}
export default Firm;