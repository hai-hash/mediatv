import React, { useContext, useState, useEffect } from 'react'
import styles from './styles.module.scss';
import { PublicContext } from '../../publicContexts/contexts';
import { Spinner } from 'react-bootstrap';
import viewApi from '../../api/view/viewApi';

const HistoryViewProfile = () => {
    const [data, setData] = useState([]);
    const { infoAccount } = useContext(PublicContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getHistoryView = async () => {
            try {
                const res = await viewApi.getHistoryViewByAccount(infoAccount?.username);
                setData(res);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        getHistoryView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const genData = () => {
        var result = null;
        if (data.length > 0) {
            result = data.map((item, index) => {
                return <tr key={index}>
                    <td>{item?.id}</td>
                    <td>{item?.createDate}</td>
                    <td>{item?.nameFilm}</td>
                </tr>
            })
        }
        return result;
    }
    return (
        <div className={styles.wap_account}>
            {data.length > 0 ?
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ngày xem</th>
                            <th>Phim xem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genData()}
                    </tbody>
                </table>
                : <h5>Không có dữ liệu</h5>
            }
            {loading ? <Spinner animation="border" className={styles.loading} /> : null}
        </div>
    )
}

export default HistoryViewProfile
