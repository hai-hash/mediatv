import styles from './styles.module.scss'
import { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import filmApi from '../../api/film/filmApi';
import Comments from '../comments/comments';
import ModalComingSoonComponent from '../../library/modal/modalCommingSoon';
import { PublicContext } from '../../publicContexts/contexts';
import evaluateAdminApi from '../../api/evaluate/evaluateApi';
import RecommenderFilm from '../recommender/recommenderFilm';
import { Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';
import { findIndex } from 'lodash';
const Firm = () => {
    const [urlCurren, setUrlCurren] = useState("");

    const [episodes, setEpisodes] = useState([]);

    const [activeCommingSoon, setActiveCommingSoon] = useState(false);

    const { infoAccount } = useContext(PublicContext);

    // lấy id bộ phim trên thanh url
    let { id } = useParams();

    const history = useHistory();


    useEffect(() => {
        const getStar = async () => {
            try {
                const res = await evaluateAdminApi.getStar(id, infoAccount?.username);
                console.log(res);

            } catch (error) {
                console.log(error);
            }
        }
        getStar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // xử lý khi thực hiện next chap
    const onNextChap = (url) => {
        setUrlCurren(url);
    }




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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, history])

    useEffect(() => {
        setUrlCurren(episodes[0]?.urlVideo ? episodes[0]?.urlVideo : "https://www.youtube.com/embed/wub1_ZWgmO0")
    }, [episodes])




    // lấy danh sách tập phim 
    const onDisplayChap = () => {
        let result = null;
        if (episodes.length > 0) {
            result = episodes.map((cha, index) => {

                return <Col xs="2" key={index}><p className={styles.button_chap} style={{ color: urlCurren === cha.urlVideo ? "#ff6500" : "#fff" }} onClick={() => onNextChap(cha.urlVideo)}>{cha.nameEpisode}</p></Col>
            })
        }
        return result;
    }
    const onChangeChap = () => {
        var index = findIndex(episodes, (episode => {
            return episode?.urlVideo === urlCurren;
        }))
        if (index !== -1) {
            if ((episodes.length - 1) >= (index + 1)) {
                setUrlCurren(episodes[index + 1]?.urlVideo);
            }
            else {
                setUrlCurren(episodes[0]?.urlVideo);
            }
        }
    }

    return (
        <div>
            {/* {urlCurren.indexOf("youtube") !== -1 &&
                <iframe src={`${urlCurren}?autoplay=1&mute=0`} className={styles.size_frame} frameborder="0" allow="autoplay; encrypted-media" allowFullScreen title="Film tv"></iframe>
            } */}
            {urlCurren.indexOf("youtube") === -1 &&
                <iframe src={`${urlCurren}`} className={styles.size_frame} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title="Film tv"></iframe>
            }
            {urlCurren.indexOf("youtube") !== -1 &&
                <ReactPlayer url={`${urlCurren}`} controls playing={true} onEnded={onChangeChap} className={styles.size_frame} />
            }

            <div className={styles.list_chap}>
                {(episodes.length === 0) ? "Phim chưa ra mắt, mong bạn quay lại sau." : "Tập phim"}
            </div>

            <div className={styles.chap}>
                <Row>
                    {onDisplayChap()}
                </Row>
            </div>
            <Comments id={id} />
            <RecommenderFilm id={id} />
            <ModalComingSoonComponent activeCommingSoon={activeCommingSoon} onCommingSoon={onCommingSoon} />
        </div>

    )
}
export default Firm;