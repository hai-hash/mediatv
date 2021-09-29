import React, { useState } from 'react'
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
const FilmEdit = () => {
    const [data, setdata] = useState({ id: "", nameFilm: "", illustration: "", title: "", status: "", director: "", actor: "", nation: "", viewingTime: "", countView: "", hot: "", year: "", active: "", createDate: "", episodes: [], categorys: [] });
    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setdata({ ...data, [name]: value })
    }
    const onSaveFilm = (e) => {
        e.preventDefault();
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