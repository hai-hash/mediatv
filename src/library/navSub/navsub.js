import styles from "./styles.module.scss"
import NavItem from "./components/navitem";
import { useState, useEffect } from "react";
import filmApi from "../../api/film/filmApi";
const NavSub = () => {
    const [active, setActive] = useState(true);
    const [seriesFilm, setSeriesFilm] = useState([]);
    const [oddFilm, setOddFilm] = useState([]);

    useEffect(() => {
        const getSeries = async () => {
            try {
                const res = await filmApi.getFilmViewMost("Phim Bộ");
                setSeriesFilm(res);
            } catch (error) {
                console.log(error);
            }
        }

        const getOdd = async () => {
            try {
                const res = await filmApi.getFilmViewMost("Phim Lẻ");
                setOddFilm(res);
            } catch (error) {
                console.log(error);
            }
        }

        getSeries();
        getOdd();

    }, [])

    const display = (active) => {
        var result = null;
        if (active === true) {
            if (seriesFilm.length > 0) {
                result = seriesFilm.map((film, index) => {
                    return (
                        <NavItem key={index} film={film}/>
                    )
                })
            }
        }
        else {
            if (oddFilm.length > 0) {
                result = oddFilm.map((film, index) => {
                    return (
                        <NavItem key={index} film={film}/>
                    )
                })
            }
        }
        return result;
    }
    const seriesMoved = () => {
        if (active === false) setActive(true);
    }
    const oddMovied = () => {
        if (active === true) setActive(false);
    }

    return (
        <>
            <div className={styles.rank}>BẢNG XẾP HẠNG</div>
            <div className={styles.button_navsub}>
                <button onClick={seriesMoved}>Phim bộ</button>
                <button onClick={oddMovied}>Phim lẻ</button>

            </div>
            {display(active)}
            <div className={styles.rank}>PHIM SẮP CHIẾU</div>
            {display(active)}

        </>
    )
}
export default NavSub;