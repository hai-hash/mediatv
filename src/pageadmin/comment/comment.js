import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import { Table } from 'reactstrap';
import commentUserApi from '../../api/comment/commentApi';
import ItemComment from './itemComment';
import * as toasts from './../../library/toast/toast';
import * as sentiment from './../../library/sentiment/sentiment';
import { Bar } from 'react-chartjs-2';
const CommentAdmin = () => {
    const [data, setData] = useState([]);
    const [dataLable, setDataLable] = useState([]);
    const [dataPositive, setDataPositive] = useState([]);
    const [dataNegative, setDataNegative] = useState([]);
    const [dataNormal, setDataNormal] = useState([]);
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

    const genDataChart = (data) => {
        var arrName = [];
        var arrLable = [];
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                arrName.push(data[i]?.film?.nameFilm)

            }
            for (var j = 0; j < arrName.length; j++) {
                if (arrLable.indexOf(arrName[j]) === -1) {
                    arrLable.push(arrName[j])
                }
            }
        }

        var dataPositive = [];
        var dataNegative = [];
        var dataNormal = [];
        for (var k = 0; k < arrLable.length; k++) {
            var valuePositive = 0;
            var valueNegative = 0;
            var valueNormal = 0;
            for (var z = 0; z < data.length; z++) {
                if (data[z]?.film?.nameFilm === arrLable[k]) {
                    var score = sentiment.sentimentText(data[z]?.contentComment);
                    if (score > 0) valuePositive = valuePositive + 1;
                    else if (score < 0) valueNegative = valueNegative + 1;
                    else valueNormal = valueNormal + 1;
                }
            }
            dataPositive.push(valuePositive);
            dataNegative.push(valueNegative);
            dataNormal.push(valueNormal);
        }
        setDataLable(arrLable);
        setDataPositive(dataPositive);
        setDataNegative(dataNegative);
        setDataNormal(dataNormal);
    }
    useEffect(() => {
        genDataChart(data);
    }, [data])

    return (
        <div>
            <div className={styles.url}>
                <div className={styles.url_left}>
                    <span>api / admin / comments </span>
                    <h5>commnet</h5>
                </div>
            </div>
            <div className={styles.table}>
                <div className={styles.chart}>
                    <Bar
                        data={{
                            labels: dataLable,
                            datasets: [
                                {
                                    label: "Positive",
                                    data: dataPositive,
                                    backgroundColor: 'green',
                                },
                                {
                                    label: "Negative",
                                    data: dataNegative,
                                    backgroundColor: 'red',
                                },
                                {
                                    label: "Normal",
                                    data: dataNormal,
                                    backgroundColor: 'blue',
                                },
                            ]

                        }}
                        width={600}
                        height={300}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th >Stt</th>
                            <th>Nội dung bình luận</th>
                            <th>Sentiment</th>
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
