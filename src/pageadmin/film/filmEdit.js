import React, { useState, useContext, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import { PublicContext } from '../../publicContexts/contexts';
import filmAdminApi from '../../api/film/filmAdminApi';
import categoryAdminApi from '../../api/category/categoryApi';
import * as toasts from './../../library/toast/toast';
import countryAdminApi from '../../api/country/countryApi';
import { findIndex } from 'lodash';

const FilmEdit = () => {
    const [data, setdata] = useState({ id: "", nameFilm: "", illustration: "", subImage: "", title: "", status: "", director: "", actor: "", nation: "", viewingTime: "", countView: "", hot: "", year: "", active: "", createDate: "", episodes: [], categorys: [] });

    const [category, setCategory] = useState([]);

    const [idCategory, setIdCategory] = useState(0);

    const [listCategory, setListCategory] = useState([]);

    const [countries, setCountries] = useState([]);

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setdata({ ...data, [name]: value })
    }

    const { filmSelect } = useContext(PublicContext);

    useEffect(() => {
        setdata(filmSelect);
        setListCategory(filmSelect?.categorys);
    }, [filmSelect])

    useEffect(() => {
        const fetchCountryList = async () => {
            try {

                const res = await countryAdminApi.getAll();
                setCountries(res);
                toasts.notifySuccess("lấy danh sách country thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách country thất bại");
            }
        }

        fetchCountryList();
    }, [])

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const res = await categoryAdminApi.getAll();
                setCategory(res)
                toasts.notifySuccess("Lấy danh sách category thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("Lấy danh sách category thất bại");
            }
        }

        fetchCategoryList();
    }, [filmSelect])

    const onSaveFilm = (e) => {
        e.preventDefault();
        const fetchUpdateFilm = async () => {
            try {
                const res = await filmAdminApi.patch(data, data.id);
                console.log(res);
                toasts.notifySuccess("Cập nhật thông tin thành công");
            } catch (error) {
                console.log("Failed to fetch update film :", error);
                toasts.notifyError("cập nhật thông tin thất bại");
            }
        }

        fetchUpdateFilm();
    }

    const onSelectFilm = (e) => {
        var value = e.target.value;
        setIdCategory(parseInt(value));
    }

    const displaySelect = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((category, index) => {
                return <option key={index} value={category.id}>{category.nameCategory}</option>
            })
        }
        return result;
    }

    const displaySelectCountry = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((country, index) => {
                return <option key={index} value={country.id}>{country.nameCountry}</option>
            })
        }
        return result;
    }

    const onAddCategory = () => {
        const addCategory = async () => {
            try {
                const res = await filmAdminApi.addCategory(idCategory, filmSelect.id);
                console.log(res);
                setListCategory(res?.categorys);
            } catch (error) {
                console.log(error);
            }
        }

        addCategory();
    }
    const onDelete = (idCategory) => {
        const deleteCategory = async () => {
            try {
                const res = await filmAdminApi.deleteCategory(idCategory, filmSelect.id);
                setListCategory(res.categorys);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        deleteCategory();
    }

    const DisplayCategory = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((category, index) => {
                return <tr key={index}>
                    <td className={styles.category_content}>{category.nameCategory}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => onDelete(category.id)}>xóa</button>
                    </td>
                </tr>
            })
        }
        return result;
    }

    const onSelectCountry = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        var index = findIndex(countries, (country) => {
            return country?.id === parseInt(value);
        })
        if (index !== -1) {
            setdata({ ...data, [name]: countries[index] })
        }
    }

    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="nameFilm" value={data?.nameFilm ? data?.nameFilm : ""} type="text" className="form-control" placeholder="nameFilm" onChange={onChangeData} />
                        </div>
                    </Col >
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="illustration" value={data?.illustration ? data?.illustration : ""} type="text" className="form-control" placeholder="illustration" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="subImage" value={data?.subImage ? data?.subImage : ""} type="text" className="form-control" placeholder="subImage" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="title" value={data?.title ? data?.title : ""} type="text" className="form-control" placeholder="title" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="status" value={data?.status ? data?.status : ""} type="text" className="form-control" placeholder="status" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="director" value={data?.director ? data?.director : ""} type="text" className="form-control" placeholder="director" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="actor" value={data?.actor ? data?.actor : ""} type="text" className="form-control" placeholder="actor" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="nation" value={data?.nation ? data?.nation : ""} type="text" className="form-control" placeholder="nation" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="viewingTime" value={data?.viewingTime ? data?.viewingTime : ""} type="text" className="form-control" placeholder="viewingTime" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="year" value={data?.year ? data?.year : ""} type="text" className="form-control" placeholder="year" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="type" value={data?.type ? data?.type : ""} type="text" className="form-control" placeholder="type" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="12" className={styles.col}>
                        <div className="form-group">
                            <select title="danh sách country" value={data?.country?.id ? data?.country.id : ""} name="country" className="form-control" onChange={onSelectCountry}>
                                {displaySelectCountry(countries)
                                }
                            </select>
                        </div>
                    </Col>
                    <Col xs="12" className={styles.col}>
                        <div className="form-group">
                            <textarea id="w3review" name="decreption" rows="4" cols="50" value={data?.decreption ? data?.decreption : ""} style={{ width: '100%', height: "300px" }} onChange={onChangeData}>
                            </textarea>
                        </div>
                    </Col>
                    <Col xs="12" className={styles.col}>
                        <div className="form-group">
                            <select title="danh sách category" name="idcategory" className="form-control" onChange={onSelectFilm}>
                                {displaySelect(category)
                                }
                            </select>
                        </div>
                    </Col>
                    <Col xs="12" className={styles.col}>
                        <button type="button" className="btn btn-primary w-100" onClick={onAddCategory}>Thêm</button>
                    </Col>
                    <Col xs="12" className={styles.col}>

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Thể loại</th>
                                    <th>Thao tác</th>
                                </tr>

                            </thead>
                            <tbody>
                                {DisplayCategory(listCategory)}
                            </tbody>
                        </table>

                    </Col>
                </Row>
                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
            </form>

        </div>
    )
}

export default FilmEdit