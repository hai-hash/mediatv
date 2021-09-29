import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import filmAdminApi from '../../api/film/filmAdminApi';
const FilmEdit = ({ filmSelected }) => {
    const [data, setdata] = useState({ id: "", nameFilm: "", illustration: "", title: "", status: "", director: "", actor: "", nation: "", viewingTime: "", countView: "", hot: "", year: "", active: "", createDate: "", episodes: [], categorys: [] });
    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setdata({ ...data, [name]: value })
    }
    useEffect(() => {
        if (filmSelected) {
            setdata(filmSelected);
        }
    }, [])
    console.log("phim đã chọn :", filmSelected)
    const onSaveFilm = (e) => {
        e.preventDefault();
        const fetchCreateFilm = async () => {
            try {
                const res = await filmAdminApi.post(data);
                console.log(res);
            } catch (error) {
                console.log("Failed to fetch create new film :", error);
            }
        }

        fetchCreateFilm();
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
                </Row>
                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
            </form>

        </div>
    )
}

export default FilmEdit