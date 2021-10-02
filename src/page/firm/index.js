import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import filmApi from '../../api/film/filmApi';
import Comments from '../comments/comments';
import ModalComingSoonComponent from '../../library/modal/modalCommingSoon';
const Firm = () => {
    const [urlCurren, setUrlCurren] = useState("https://www.youtube.com/embed/wub1_ZWgmO0");

    const [episodes, setEpisodes] = useState([]);

    const [activeCommingSoon, setActiveCommingSoon] = useState(false);

    // xử lý khi thực hiện next chap
    const onNextChap = (url) => {
        setUrlCurren(url);
    }
    // lấy id bộ phim trên thanh url
    let { id } = useParams();

    const history = useHistory();

    const onCommingSoon = () => {
        setActiveCommingSoon(!activeCommingSoon);
    }

    // gọi api để danh sách tập phim
    useEffect(() => {
        var token = localStorage.getItem("token");
        if (token) {
            const getEpisode = async () => {
                try {
                    const res = await filmApi.getepisode(id);
                    setEpisodes(res);
                    if (res.length === 0) setActiveCommingSoon(true);
                } catch (error) {
                    console.log(error);
                }
            }
            getEpisode();
        }
        else {
            history.push("/home");
            alert("bạn cần đăng nhập để vào trang này");
        }

    }, [id, history])

    useEffect(() => {
        setUrlCurren(episodes[0]?.urlVideo ? episodes[0]?.urlVideo : "https://www.youtube.com/embed/wub1_ZWgmO0")
    }, [episodes])




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

            <div className={styles.list_chap}>
                {(episodes.length === 0) ? "Phim chưa ra mắt, mong bạn quay lại sau" : "Danh sách tập"}
            </div>
            <div className={styles.chap}>
                {onDisplayChap()}
            </div>
            <Comments id={id} />
            <ModalComingSoonComponent activeCommingSoon={activeCommingSoon} onCommingSoon={onCommingSoon} />
        </div>

    )
}
export default Firm;