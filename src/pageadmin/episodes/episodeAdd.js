import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import episodeAdminApi from '../../api/episode/episodeApi';
import filmAdminApi from '../../api/film/filmAdminApi';
import * as toasts from './../../library/toast/toast';
const EpisodeAdd = () => {
    const [data, setData] = useState({});

    const [film, setFilm] = useState([]);

    const [idFilm, setIdFilm] = useState(0);

    useEffect(() => {
        const fetchFilmList = async () => {
            try {
                const res = await filmAdminApi.getAll();
                setFilm(res);
                toasts.notifySuccess("thêm thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("thêm thất bại");
            }
        }

        fetchFilmList();
    }, [])

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setData({ ...data, [name]: value })

    }

    const onSaveFilm = (e) => {
        e.preventDefault();
        const fetchCreateEpisode = async () => {
            try {
                const res = await episodeAdminApi.post(data, idFilm);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCreateEpisode();
    }

    const onSelectFilm = (e) => {
        var value = e.target.value;
        setIdFilm(parseInt(value));
    }

    const displaySelect = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((film, index) => {
                return <option key={index} value={film.id}>{film.nameFilm}</option>
            })
        }
        return result;
    }

    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col} xs="12">
                        <div className="form-group">
                            <input title="tên tập phim" required name="nameEpisode" type="text" className="form-control" placeholder="nameEpisode" onChange={onChangeData} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs="12">
                        <div className="form-group">
                            <input title="đường link video" required name="urlVideo" type="text" className="form-control" placeholder="urlVideo" onChange={onChangeData} />
                        </div>
                    </Col >
                    <Col xs="12">
                        <div className="form-group">
                            <select title="phim cần thêm" name="idFilm" className="form-control" onChange={onSelectFilm}>
                                {displaySelect(film)
                                }
                            </select>
                        </div>
                    </Col>

                </Row>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        </div>
    )
}

export default EpisodeAdd
