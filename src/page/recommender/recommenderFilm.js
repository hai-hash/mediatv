import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineMessage } from 'react-icons/ai';
import styles from './styles.module.scss';
import { PublicContext } from '../../publicContexts/contexts';
import filmApi from '../../api/film/filmApi';
import ItemFirm from '../home/components/Itemfirm';
const RecommenderFilm = ({ id }) => {
    const [data, setData] = useState([]);
    const { infoAccount } = useContext(PublicContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const getFilmRecommender = async () => {
                try {
                    const params = {
                        username: infoAccount?.username ? infoAccount?.username : "",
                        id: id
                    }
                    const res = await filmApi.getFilmRecommender(params);
                    setData(res);
                    console.log(res);
                } catch (error) {
                    console.log(error);
                }
            }
            getFilmRecommender();
        }
        else {
            const getFilmRecommenderByCategory = async () => {
                try {
                    const params = {
                        id: id
                    }
                    const res = await filmApi.getFilmViewMostByCategory(params);
                    setData(res);
                    console.log(res);
                } catch (error) {
                    console.log(error);
                }
            }
            getFilmRecommenderByCategory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

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
            <h1 className={styles.title_series}><AiOutlineMessage className={styles.icon_series} />CÓ THỂ BẠN MUỐN XEM</h1>
            <div className="row">
                {display()}
            </div>
        </>
    )
}

export default RecommenderFilm
