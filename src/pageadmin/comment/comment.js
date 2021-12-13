import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import { Col, Row, Table } from 'reactstrap';
import commentUserApi from '../../api/comment/commentApi';
import ItemComment from './itemComment';
import * as toasts from './../../library/toast/toast';
import * as sentiment from './../../library/sentiment/sentiment';
import { Bar } from 'react-chartjs-2';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdRefresh } from 'react-icons/md';
import { OnFilterByDate, formatDate } from './../../common/commonFuncition';
const CommentAdmin = () => {
    const [data, setData] = useState([]);
    const [dataLable, setDataLable] = useState([]);
    const [dataPositive, setDataPositive] = useState([]);
    const [dataNegative, setDataNegative] = useState([]);
    const [dataNormal, setDataNormal] = useState([]);
    const [dataCopy, setDataCopy] = useState([]);
    const [date, setDate] = useState({ startDate: "", endDate: "" });
    const [refreshDate, setRefreshDate] = useState(formatDate(new Date()));


    useEffect(() => {
        setDataCopy(data);
    }, [data])
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

    const onSearch = () => {
        let dataFilter = OnFilterByDate('createDate', date.startDate, date.endDate, data);
        setDataCopy(dataFilter);
    }
    const onChangeDate = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setDate({ ...date, [name]: value });
    }

    const onRefresh = () => {
        setRefreshDate(formatDate(new Date()));
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
    }
    const onDataSearch = (e) => {
        if (e.target.value !== "") {
            const dataFilter = data.filter((item) => {

                return item?.film?.nameFilm.toLowerCase().indexOf(e.target.value) !== -1;
            })
            setDataCopy(dataFilter);
        }
        else {
            setDataCopy(data);
        }

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
                <div className={styles.search}>
                    <Row>
                        <Col xs="2">
                            <input type="date" name="startDate" style={{ width: '170px' }} onChange={onChangeDate} />
                        </Col>
                        <Col xs="2">
                            <input type="date" name="endDate" style={{ width: '170px' }} onChange={onChangeDate} />
                        </Col>
                        <Col xs="2">
                            <button onClick={onSearch} >Search</button>
                        </Col>
                        <Col xs="3">
                        </Col>
                        <Col xs="3">
                            <span>Last Update : {refreshDate}</span>
                            <MdRefresh size={35} className={styles.icon_refresh} onClick={onRefresh} />

                        </Col>
                    </Row>

                    <Row style={{ marginTop: '20px' }}>
                        <Col xs="4">
                            <span className={styles.search_name_film}>
                                <input type="text" style={{ width: '375px' }} placeholder='Tên Phim' onChange={onDataSearch} />
                                < AiOutlineSearch size={25} className={styles.icon_search} />
                            </span>

                        </Col>
                    </Row>
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
                        {Dispplay(dataCopy)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CommentAdmin
