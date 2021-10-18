import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import { Table } from 'reactstrap';
import commentUserApi from '../../api/comment/commentApi';
import ItemComment from './itemComment';
import * as toasts from './../../library/toast/toast';
const CommentAdmin = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getAllComment = async () => {
            try {
                const res = await commentUserApi.getAll();
                setData(res);
                console.log(res);
                toasts.notifySuccess("lấy danh sách bình luận thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách bình luận thất bại");
            }
        }
        getAllComment();
    }, [])

    const Dispplay = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((comment, index) => {
                return <ItemComment comment={comment} key={index} />
            })
        }
        return result;
    }

    return (
        <div>
            <div className={styles.url}>
                <div className={styles.url_left}>
                    <span>api / admin / comments </span>
                    <h5>commnet</h5>
                </div>
            </div>
            <div className={styles.table}>
                <Table striped>
                    <thead>
                        <tr>
                            <th >Stt</th>
                            <th>Nội dung bình luận</th>
                            <th>Tài khoản bình luận</th>
                            <th>Bộ phim bình luận</th>
                            <th>Thời gian bình luận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Dispplay(data)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CommentAdmin
