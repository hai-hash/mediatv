import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss';
import { AiFillVideoCamera } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import filmApi from '../../api/film/filmApi';
import ItemFirm from './../home/components/Itemfirm';
import BasePagination from '../../library/pagination/pagination';

const FilmByType = () => {
    let { name } = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        const getFilmByType = async () => {
            try {
                const params = {
                    name: name,
                    page: page - 1,
                    size: 20
                }
                const res = await filmApi.getFilmByType(params);
                setData(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        getFilmByType();
    }, [name, page])

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

    const onPageChange = (page) => {
        setPage(page)
    }

    return (
        <>
            <h1 className={styles.title_series}><AiFillVideoCamera className={styles.icon_series} />Thể Loại {name}</h1>
            <div className="row">
                {display()}
            </div>
            <BasePagination
                page={page}
                total={100}
                onPageChange={onPageChange}
                limit={20}
            />
        </>
    )
}

export default FilmByType
