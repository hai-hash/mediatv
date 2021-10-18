import 'bootstrap/dist/css/bootstrap.min.css';
import ItemFirm from './Itemfirm';
import styles from './styles.module.scss';
import { AiFillVideoCamera, AiFillCaretDown } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import filmApi from '../../../api/film/filmApi';
const Anime = () => {
    const [data, setData] = useState([]);
    const [sizePage, setSizePage] = useState(8);
    useEffect(() => {
        const fetchFilmList = async () => {
            try {
                const params = {
                    name: "Anime",
                    size: sizePage,
                }
                const res = await filmApi.getFilmNewUpdateByCategory(params);
                setData(res);
            } catch (error) {
                console.log("Failed to fetch film list :", error);
            }
        }

        fetchFilmList();

    }, [sizePage])
    const display = () => {
        var result = null;
        if (data.length > 0) {
            result = data.map((video, index) => {
                return (
                    <div className={`col-xs-3 col-sm-3 col-md-3 col-lg-3 ${styles.col_custom}`} key={index}>
                        <ItemFirm video={video} />
                    </div>
                )
            })
        }
        return result;
    }
    const onViewMore = () => {
        let oldSize = sizePage;
        let newSize = oldSize + 4;
        setSizePage(newSize);
    }
    return (
        <>
            <h1 className={styles.title_series}><AiFillVideoCamera className={styles.icon_series} />PHIM HOẠT HÌNH ANIME</h1>
            <div className="row">
                {display()}
            </div>
            <div className={styles.view_more} onClick={onViewMore}>Xem thêm <AiFillCaretDown /></div>
        </>
    )
}
export default Anime;