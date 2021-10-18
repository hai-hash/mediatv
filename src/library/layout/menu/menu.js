import styles from './../styles.module.scss';
import { AiFillHome } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import categoryAdminApi from '../../../api/category/categoryApi';
import { useEffect, useState } from 'react';
import countryAdminApi from '../../../api/country/countryApi';
import { AiOutlineBlock } from 'react-icons/ai'
import { BiGlobe } from 'react-icons/bi'
import { GrMultimedia } from 'react-icons/gr'
import { RiPlayList2Fill } from 'react-icons/ri'
import { GiJusticeStar } from 'react-icons/gi'
import { MdPlaylistPlay } from 'react-icons/md'
import { BiCaretRightCircle } from 'react-icons/bi'

const Menu = () => {
    const [categories, setCategory] = useState([]);
    const [countries, setCountry] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const res = await categoryAdminApi.getAllPublic();
                setCategory(res);
                console.log(res)
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategoryList();
    }, [])

    useEffect(() => {
        const fetchCountryList = async () => {
            try {
                const res = await countryAdminApi.getAll();
                setCountry(res);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCountryList();
    }, [])

    const onGoToHome = () => {
        history.push("/home");
    }
    const onToPageCategory = (name) => {
        history.push(`/home/category/${name}`)
    }

    const onToPageCountry = (name) => {
        history.push(`/home/country/${name}`)
    }

    const displayCategory = (categories) => {
        var result = null;
        if (categories.length > 0) {
            result = categories.map((category, index) => {
                return <Col xs={3} key={index} className={styles.col_category} onClick={() => onToPageCategory(category?.nameCategory)}>
                    <p className={styles.name_category}>{category?.nameCategory}</p>
                </Col>
            })
        }
        return result;
    }

    const displayCountry = (countries) => {
        var result = null;
        if (countries.length > 0) {
            result = countries.map((country, index) => {
                return <Col xs={4} key={index} className={styles.col_country} onClick={() => onToPageCountry(country?.nameCountry)}>
                    <p className={styles.name_country}>{country?.nameCountry}</p>
                </Col>
            })
        }
        return result;
    }

    const onGoToPageType = (name) => {
        history.push(`/home/type/${name}`);
    }

    return (
        <>
            <div className={styles.menu}>
                <ul className={styles.category}>
                    <li onClick={onGoToHome}>
                        <div className={styles.wap_element}>
                            <AiFillHome className={styles.icon_home} />
                        </div>
                    </li>
                    <li className={styles.main_category}>
                        <div className={styles.wap_element}>
                            <AiOutlineBlock className={styles.icon_category} />
                            <span>Thể loại</span>
                        </div>

                        <div className={styles.sub_category}>
                            <Row className={styles.row_category}>
                                {displayCategory(categories)}
                            </Row>
                        </div>
                    </li>
                    <li className={styles.main_country}>
                        <div className={styles.wap_element}>
                            <BiGlobe className={styles.icon_nation} />
                            <span>Quốc gia</span>
                        </div>
                        <div className={styles.sub_country}>
                            <Row className={styles.row_country}>
                                {displayCountry(countries)}
                            </Row>
                        </div>
                    </li>
                    <li onClick={() => onGoToPageType("Phim Lẻ")}>
                        <div className={styles.wap_element}>
                            <GrMultimedia className={styles.icon_media} />
                            <span>Phim lẻ</span>
                        </div>
                    </li>
                    <li onClick={() => onGoToPageType("Phim Bộ")}>
                        <div className={styles.wap_element}>
                            <RiPlayList2Fill className={styles.icon_firm} />
                            <span>Phim bộ</span>
                        </div>
                    </li>
                    <li onClick={() => onToPageCategory("Hoạt Hình")}>
                        <div className={styles.wap_element}>
                            <GiJusticeStar className={styles.icon_star} />
                            <span>Hoạt Hình</span>
                        </div>
                    </li>
                    <li onClick={() => onToPageCategory("Chiếu Rạp")}>
                        <div className={styles.wap_element}>
                            <MdPlaylistPlay className={styles.icon_cinema} />
                            <span>Chiếu Rạp</span>
                        </div>
                    </li>
                    <li onClick={() => onToPageCategory("TV Show")}>
                        <div className={styles.wap_element}>
                            <BiCaretRightCircle className={styles.icon_tvshow} />
                            <span>TV Show</span>
                        </div>
                    </li>
                </ul>

            </div>
        </>
    );
}
export default Menu;