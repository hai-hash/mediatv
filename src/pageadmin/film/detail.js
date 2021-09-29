import React, { useEffect, useState } from 'react';
import filmAdminApi from '../../api/film/filmAdminApi';
import styles from './styles.module.scss';
const DetailFilm = ({ id }) => {
    const [data, setData] = useState()
    useEffect(() => {
        if (id !== 0) {
            const fetchFilmLDetail = async () => {
                try {
                    const res = await filmAdminApi.get(id);
                    setData(res);
                } catch (error) {
                    console.log("Failed to fetch film detail:", error);
                }
            }

            fetchFilmLDetail();

        }
    }, [id])
    return (
        <div className={styles.wap_detail_film}>

            <div className={styles.detail_film}>
                <h1>Tên Phim : <span>{data?.nameFilm}</span></h1>
                <p>Đường dẫn ảnh : <span>{data?.illustration}</span></p>
                <p>Tên quốc gia : <span>{data?.nation}</span></p>
                <p>Lượt xem : <span>{data?.countView}</span></p>
                <p>Thời gian xem : <span>{data?.viewingTime}</span></p>
                <p>Trạng thái hoạt động : <span>{data?.active ? "Đang hoạt động" : "Không hoạt động"}</span></p>
                <p>Năm sản xuất : <span>{data?.year}</span></p>
                <p>Ngày khởi tạo : <span>{data?.createDate}</span></p>
                <h3>Các tập phim</h3>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Đường dẫn Video</th>
                            <th>Trạng thái hoạt động</th>
                            <th>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.episodes.map((epi, index) => {
                                return <tr key={index}>
                                    <td>{epi?.nameEpisode}</td>
                                    <td>{epi?.urlVideo}</td>
                                    <td>{epi?.active ? "Hoạt động" : "Không hoạt động"}</td>
                                    <td>{epi?.createDate}</td>
                                </tr>
                            })

                        }
                    </tbody>
                </table>

            </div>

        </div>

    )
}

export default DetailFilm
