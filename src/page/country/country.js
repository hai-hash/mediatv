import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss';
import { AiFillVideoCamera } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import filmApi from '../../api/film/filmApi';
import ItemFirm from './../home/components/Itemfirm';

const FilmByCountry = () => {
    let { name } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        const getFilmByCountry = async () => {
            try {
                const params = {
                    page: 0,
                    size: 20
                }
                const res = await filmApi.getFilmByCountry(params, name);
                setData(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        getFilmByCountry();
    }, [name])

    const display = () => {
        var result = null;
        if (data.length > 0) {
            result = data.map((video, index) => {
                return (
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" key={index}>
                        <ItemFirm video={video} />
                    </div>
                )
            })
        }
        return result;
    }

    return (
        <>
            <h1 className={styles.title_series}><AiFillVideoCamera className={styles.icon_series} />Quốc Gia {name}</h1>
            <div className="row">
                {display()}
            </div>
        </>
    )
}

export default FilmByCountry
