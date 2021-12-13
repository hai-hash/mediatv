import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'reactstrap';
import styles from './styles.module.scss';
import * as toasts from './../../library/toast/toast';
import EvaluateItem from './evaluateItem';
import evaluateAdminApi from '../../api/evaluate/evaluateApi';
import { OnFilterByDate, formatDate } from './../../common/commonFuncition';
import { MdRefresh } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
const EvaluateDisplay = ({ setStatus }) => {
    const [data, setData] = useState([]);
    const [dataCopy, setDataCopy] = useState([]);
    const [date, setDate] = useState({ startDate: "", endDate: "" });
    const [refreshDate, setRefreshDate] = useState(formatDate(new Date()));



    useEffect(() => {
        setDataCopy(data);
    }, [data])

    useEffect(() => {
        const fetchEvaluateList = async () => {
            try {
                const res = await evaluateAdminApi.getAll();
                setData(res);
                toasts.notifySuccess("lấy danh sách Evaluate thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách Evaluate thất bại");
            }
        }

        fetchEvaluateList();
    }, [])

    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((evaluate, index) => {
                return <EvaluateItem evaluate={evaluate} key={index} setStatus={setStatus} />
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
        const fetchEvaluateList = async () => {
            try {
                const res = await evaluateAdminApi.getAll();
                setData(res);
                toasts.notifySuccess("lấy danh sách Evaluate thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách Evaluate thất bại");
            }
        }
        fetchEvaluateList();
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
                <Table striped></Table>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Số sao đánh giá</th>
                            <th>Tài khoản đánh giá</th>
                            <th>Bộ phim được đánh giá</th>
                            <th>Ngày khởi tạo</th>
                            <th>Ngày cập nhật</th>
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

export default EvaluateDisplay
