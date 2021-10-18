import styles from "./styles.module.scss";
import NavItem from "./components/navitem";
import { useState, useEffect } from "react";
import filmApi from "../../api/film/filmApi";
import { AiFillCaretDown } from 'react-icons/ai';
const NavSub = () => {
    const [active, setActive] = useState(true);
    const [seriesFilm, setSeriesFilm] = useState([]);
    const [oddFilm, setOddFilm] = useState([]);
    const [upComingMovie, setUpComingMovie] = useState([]);
    const [countPage, setCountPage] = useState(0);

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

    useEffect(() => {
        const getUpComingMovie = async () => {
            try {
                const params = {
                    status: "Sắp ra mắt",
                    page: countPage,
                    size: 8
                }
                const res = await filmApi.getUpComingMovie(params);
                var arr_result = upComingMovie.concat(res);
                setUpComingMovie(arr_result);
            } catch (error) {
                console.log(error);
            }
        }
        getUpComingMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countPage])

    const display = (active) => {
        var result = null;
        if (active === true) {
            if (seriesFilm.length > 0) {
                result = seriesFilm.map((film, index) => {
                    return (
                        <NavItem key={index} film={film} />
                    )
                })
            }
        }
        else {
            if (oddFilm.length > 0) {
                result = oddFilm.map((film, index) => {
                    return (
                        <NavItem key={index} film={film} />
                    )
                })
            }
        }
        return result;
    }

    const displayUpComingMovie = () => {
        var result = null;

        if (upComingMovie.length > 0) {
            result = upComingMovie.map((film, index) => {
                return (
                    <NavItem key={index} film={film} />
                )
            })
        }

        return result;
    }

    const seriesMoved = () => {
        if (active === false) setActive(true);
    }
    const oddMovied = () => {
        if (active === true) setActive(false);
    }
    const onViewMore = () => {
        setCountPage(countPage + 1);
    }

    return (
        <>
            <div className={styles.rank}>BẢNG XẾP HẠNG</div>
            <div className={styles.button_navsub}>
                <button onClick={seriesMoved} className={active === true ? styles.button_active : null}>Phim bộ</button>
                <button onClick={oddMovied} className={active === false ? styles.button_active : null}>Phim lẻ</button>

            </div>
            {display(active)}
            <div className={styles.rank}>PHIM SẮP CHIẾU</div>
            {displayUpComingMovie()}
            <div className={styles.view_more} onClick={onViewMore}>Xem thêm <AiFillCaretDown /></div>

        </>
    )
}
export default NavSub;