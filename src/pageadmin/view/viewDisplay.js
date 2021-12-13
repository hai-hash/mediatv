import React, { useState, useEffect } from 'react'
import { Col, Row, Table } from 'reactstrap';
import styles from './styles.module.scss';
import viewApi from '../../api/view/viewApi';
import ItemView from './itemView';
import * as toasts from './../../library/toast/toast';
import { Bar } from 'react-chartjs-2';
import { OnFilterByDate, formatDate } from './../../common/commonFuncition';
import { MdRefresh } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
const ViewDisplay = ({ setStatus }) => {
    const [data, setData] = useState([]);
    const [dataLable, setDataLable] = useState([]);
    const [dataNumber, setDataNumber] = useState([]);
    const [dataCopy, setDataCopy] = useState([]);
    const [date, setDate] = useState({ startDate: "", endDate: "" });
    const [refreshDate, setRefreshDate] = useState(formatDate(new Date()));
    useEffect(() => {
        setDataCopy(data);
    }, [data])

    useEffect(() => {
        const getAll = async () => {
            try {
                const res = await viewApi.getAll();
                setData(res);
                console.log(res);
                toasts.notifySuccess("lấy danh sách lượt xem thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách lượt xem thất bại");
            }
        }
        getAll();
    }, [])

    const genDataLableChart = (data) => {
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
        var dataNumber = [];
        for (var k = 0; k < arrLable.length; k++) {
            var value = 0;
            for (var z = 0; z < data.length; z++) {
                if (data[z]?.film?.nameFilm === arrLable[k]) {
                    value = value + data[z].countView;
                }
            }
            dataNumber.push(value);
        }
        setDataLable(arrLable);
        setDataNumber(dataNumber);
        console.log("đây là lable :", arrLable);
        console.log("đây là dữ liệu :", dataNumber);
    }



    useEffect(() => {
        genDataLableChart(data)
    }, [data])

    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((view, index) => {
                return <ItemView view={view} key={index} setStatus={setStatus} />
            })
        }
        return result;
    }

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
        const getAll = async () => {
            try {
                const res = await viewApi.getAll();
                setData(res);
                console.log(res);
                toasts.notifySuccess("lấy danh sách lượt xem thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách lượt xem thất bại");
            }
        }
        getAll();
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
        <>


            <div className={styles.table}>
                <div className={styles.chart}>
                    <Bar
                        data={{
                            labels: dataLable,
                            datasets: [
                                {
                                    label: "view Total",
                                    data: dataNumber,
                                    backgroundColor: '#426ebe',
                                }
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
                            <th>Stt</th>
                            <th>Lượt xem</th>
                            <th>Ngày</th>
                            <th>Tháng</th>
                            <th>Năm</th>
                            <th>Phim</th>
                            <th>ngày khởi tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Display(dataCopy)}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ViewDisplay
