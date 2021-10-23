import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import filmAdminApi from '../../api/film/filmAdminApi';
import * as toasts from './../../library/toast/toast';
import countryAdminApi from '../../api/country/countryApi';
import { findIndex } from 'lodash';
import { Spinner } from 'react-bootstrap';
const FilmAdd = () => {
    const [data, setdata] = useState({ hot: false, active: true, countView: 0, score: 0, illustration: "", subImage: "" });
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSub, setLoadingSub] = useState(false);
    const [imageMain, setImageMain] = useState("");
    const [imageSub, setImageSub] = useState("");

    useEffect(() => {
        setdata({ ...data, illustration: imageMain });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageMain])

    useEffect(() => {
        setdata({ ...data, subImage: imageMain });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSub])

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

    const displaySelect = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((country, index) => {
                return <option key={index} value={country.id}>{country.nameCountry}</option>
            })
        }
        return result;
    }

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setdata({ ...data, [name]: value })

    }

    const onSaveFilm = (e) => {
        e.preventDefault();
        const fetchCreateFilm = async () => {
            try {
                const res = await filmAdminApi.post(data);
                console.log(res);
                toasts.notifySuccess("Thêm thành công");
            } catch (error) {
                console.log("Failed to fetch create new film :", error);
                toasts.notifyError("Thêm thất bại");
            }
        }

        fetchCreateFilm();
    }

    const onSelectFilm = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        var index = findIndex(countries, (country) => {
            return country?.id === parseInt(value);
        })
        if (index !== -1) {
            setdata({ ...data, [name]: countries[index] })
        }
    }

    const onUploadImageMain = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'filmtvimages');
        setLoading(true);
        const res = await fetch('https://api.cloudinary.com/v1_1/filmtv/image/upload', {
            method: 'POST',
            body: data
        })
        const file = await res.json();
        setImageMain(file.secure_url);
        setLoading(false);
    }

    const onUploadImageSub = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'filmtvimages');
        setLoadingSub(true);
        const res = await fetch('https://api.cloudinary.com/v1_1/filmtv/image/upload', {
            method: 'POST',
            body: data
        })
        const file = await res.json();
        setImageSub(file.secure_url)
        setLoadingSub(false);
    }
    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="nameFilm" type="text" className="form-control" placeholder="nameFilm" onChange={onChangeData} />
                        </div>
                    </Col >
                    <Col xs="6" className={styles.col}>
                        <div className={`form-group  ${styles.update_main_file}`}>
                            {loading ?
                                <Spinner animation="border" className={styles.loading} />
                                : null}
                            <input required name="illustration" type="text" className="form-control" value={data?.illustration} placeholder="illustration" onChange={onChangeData} />
                            <input type="file" className={`form-control ${styles.input_file}`} required="required" onChange={onUploadImageMain} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className={`form-group  ${styles.update_main_file}`}>
                            {loadingSub ?
                                <Spinner animation="border" className={styles.loading} /> : null}
                            <input required name="subImage" type="text" className="form-control" value={data?.subImage} placeholder="subImage" onChange={onChangeData} />
                            <input type="file" className={`form-control ${styles.input_file}`} required="required" onChange={onUploadImageSub} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="title" type="text" className="form-control" placeholder="title" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="status" type="text" className="form-control" placeholder="status" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="director" type="text" className="form-control" placeholder="director" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="actor" type="text" className="form-control" placeholder="actor" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="nation" type="text" className="form-control" placeholder="nation" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="viewingTime" type="text" className="form-control" placeholder="viewingTime" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="year" type="text" className="form-control" placeholder="year" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="6" className={styles.col}>
                        <div className="form-group">
                            <input required name="type" type="text" className="form-control" placeholder="type" onChange={onChangeData} />
                        </div>
                    </Col>
                    <Col xs="12" className={styles.col}>
                        <div className="form-group">
                            <select title="danh sách country" name="country" className="form-control" onChange={onSelectFilm}>
                                {displaySelect(countries)
                                }
                            </select>
                        </div>
                    </Col>
                    <Col xs="12" className={styles.col}>
                        <div className="form-group">
                            <textarea id="w3review" name="decreption" rows="4" cols="50" style={{ width: '100%', height: "300px" }} onChange={onChangeData}>
                            </textarea>
                        </div>
                    </Col>
                </Row>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        </div>
    )
}

export default FilmAdd
