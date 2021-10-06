import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import * as toasts from './../../library/toast/toast';
import accountApi from '../../api/account/accountApi';
import filmAdminApi from '../../api/film/filmAdminApi';
import { findIndex } from 'lodash';
import evaluateAdminApi from '../../api/evaluate/evaluateApi';

const EvaluateAdd = () => {
    const [data, setdata] = useState({});

    const [films, setFilm] = useState([]);

    const [accounts, setAccount] = useState([]);

    useEffect(() => {
        const getAllAccount = async () => {
            try {
                const res = await accountApi.getAll();
                setAccount(res);
                console.log(res);
                toasts.notifySuccess("lấy danh sách account thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách account thất bại");
            }
        }
        getAllAccount();
    }, [])

    useEffect(() => {
        const fetchFilmList = async () => {
            try {
                const res = await filmAdminApi.getAll();
                setFilm(res);
                toasts.notifySuccess("lấy danh sách film thành công");
            } catch (error) {
                console.log("Failed to fetch film admin list :", error);
                toasts.notifyError("lấy danh sách phim thất bại");
            }
        }
        fetchFilmList()
    }, [])

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setdata({ ...data, [name]: value })

    }

    const onSaveFilm = (e) => {
        e.preventDefault();
        const createNewEvaluate = async () => {
            try {
                const res = await evaluateAdminApi.post(data)
                console.log(res);
                toasts.notifySuccess("Thêm thành công");
            } catch (error) {
                console.log(error);
                toasts.notifySuccess("Thêm thất bại");
            }
        }
        createNewEvaluate();

    }

    const displaySelectFilm = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((film, index) => {
                return <option key={index} value={film.id}>{film.nameFilm}</option>
            })
        }
        return result;
    }

    const displaySelectAccount = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((account, index) => {
                return <option key={index} value={account.id}>{account.username}</option>
            })
        }
        return result;
    }

    const onSelectFilm = (e) => {
        var name = e.target.name;
        var id_film = e.target.value;
        var index = findIndex(films, (film) => {
            return film?.id === parseInt(id_film);
        })
        if (index !== -1) {
            setdata({ ...data, [name]: films[index] })
        }
    }

    const onSelectAccount = (e) => {
        var name = e.target.name;
        var id_account = e.target.value;
        var index = findIndex(accounts, (account) => {
            return account?.id === parseInt(id_account);
        })
        if (index !== -1) {
            setdata({ ...data, [name]: accounts[index] })
        }
    }



    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input required name="star" type="text" className="form-control" placeholder="star" onChange={onChangeData} />
                        </div>
                    </Col >
                    <Col xs={12} className={styles.col}>
                        <div className="form-group">
                            <select required title="danh sách phim" name="film" className="form-control" onChange={onSelectFilm}>
                                {displaySelectFilm(films)}
                            </select>
                        </div>
                    </Col>
                    <Col xs={12} className={styles.col}>
                        <div className="form-group">
                            <select required title="danh sách account" name="account" className="form-control" onChange={onSelectAccount}>
                                {displaySelectAccount(accounts)}
                            </select>
                        </div>
                    </Col>
                </Row>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        </div>
    )
}

export default EvaluateAdd
