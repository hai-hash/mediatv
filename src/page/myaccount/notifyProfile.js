import React, { useEffect, useState } from 'react'
import notifyApi from '../../api/notify/notifyApi';
import styles from './styles.module.scss';
import { Spinner } from 'react-bootstrap';

const NotifyProfile = () => {
    const [listNotify, setListNotify] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const getNotify = async () => {
            try {
                const res = await notifyApi.getNotify();
                if (res) {
                    setListNotify(res);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        getNotify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const renderElementNotify = () => {
        let result = null;
        if (listNotify.length > 0) {
            result = listNotify.map((item, index) => {
                return <div className={styles.notify_item} key={index}>
                    <div className={styles.notify_icon}></div>
                    <div className={styles.notify_detail}>
                        <div className={styles.notify_title}>
                            {item?.titleNotify}
                        </div>
                        <div className={styles.notify_content}>
                            {item?.contentNotify}
                        </div>
                        <div className={styles.notify_date}>{item?.dateNotify}</div>
                    </div>

                </div>
            })
        }
        return result;
    }
    return (
        <div className={styles.wap_notify}>

            {renderElementNotify()}
            {loading ? <Spinner animation="border" className={styles.loading} /> : null}
            {/* <h3>Không có dữ liệu</h3> */}
        </div>
    )
}

export default NotifyProfile
