import styles from './../styles.module.scss';
import { AiFillHome } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import categoryAdminApi from '../../../api/category/categoryApi';
import { useEffect, useState } from 'react';
import countryAdminApi from '../../../api/country/countryApi';

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
                return <Col xs={3} key={index} className={styles.col_country} onClick={() => onToPageCountry(country?.nameCountry)}>
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
                    <li onClick={onGoToHome}><AiFillHome className={styles.icon_home} /></li>
                    <li className={styles.main_category}>
                        <span>Thể loại</span>
                        <div className={styles.sub_category}>
                            <Row className={styles.row_category}>
                                {displayCategory(categories)}
                            </Row>
                        </div>
                    </li>
                    <li className={styles.main_country}>
                        <span>Quốc gia</span>
                        <div className={styles.sub_country}>
                            <Row className={styles.row_country}>
                                {displayCountry(countries)}
                            </Row>
                        </div>
                    </li>
                    <li onClick={() => onGoToPageType("Phim Lẻ")}>
                        <span>Phim lẻ</span>
                    </li>
                    <li onClick={() => onGoToPageType("Phim Bộ")}><span>Phim bộ</span></li>
                    <li onClick={() => onToPageCategory("Hoạt Hình")}><span>Hoạt Hình</span></li>
                    <li onClick={() => onToPageCategory("Chiếu Rạp")}><span>Chiếu Rạp</span></li>
                    <li onClick={() => onToPageCategory("TV Show")}><span>TV Show</span></li>
                </ul>

            </div>
        </>
    );
}
export default Menu;