import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import episodeAdminApi from '../../api/episode/episodeApi';
import filmAdminApi from '../../api/film/filmAdminApi';
import { PublicContext } from '../../publicContexts/contexts';
import { findIndex } from 'lodash';
const EpisodeEdit = () => {
    const [data, setData] = useState({ id: "", nameEpisode: "", urlVideo: "", film: "" });

    const [films, setFilms] = useState([]);

    const { episodeSelect } = useContext(PublicContext);

    useEffect(() => {
        if (episodeSelect) {
            setData(episodeSelect);
        }

    }, [episodeSelect])

    useEffect(() => {
        const fetchFilmList = async () => {
            try {
                const res = await filmAdminApi.getAll();
                setFilms(res);
            } catch (error) {
                console.log(error);
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
        const fetchEditEpisode = async () => {
            try {
                const res = await episodeAdminApi.put(data, data?.id);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

        fetchEditEpisode();
    }

    const onSelectFilm = (e) => {
        var value = e.target.value;
        const index = findIndex(films, (item) => {
            return item?.id === parseInt(value);
        })
        if (index !== -1) {
            setData({ ...data, film: films[index] })
        }

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
                            <input title="tên tập phim" value={data?.nameEpisode} required name="nameEpisode" type="text" className="form-control" placeholder="nameEpisode" onChange={onChangeData} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs="12">
                        <div className="form-group">
                            <input title="đường link video" value={data?.urlVideo} required name="urlVideo" type="text" className="form-control" placeholder="urlVideo" onChange={onChangeData} />
                        </div>
                    </Col >
                    <Col xs="12">
                        <div className="form-group">
                            <select title="phim cần thêm" value={data?.film?.id} name="idFilm" className="form-control" onChange={onSelectFilm}>
                                {displaySelect(films)
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

export default EpisodeEdit
