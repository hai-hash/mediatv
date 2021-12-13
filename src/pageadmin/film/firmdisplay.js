import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'reactstrap';
import styles from './styles.module.scss';
import ItemFirm from './itemfilm';
import filmAdminApi from '../../api/film/filmAdminApi';
import * as toasts from './../../library/toast/toast';
import { OnFilter, OnFilterByDate, formatDate } from './../../common/commonFuncition';
import { MdRefresh } from 'react-icons/md';
const FilmDisplay = ({ setStatus, setId }) => {
    const [data, setData] = useState([]);
    const [dataCopy, setDataCopy] = useState([]);
    const [date, setDate] = useState({ startDate: "", endDate: "" });
    const [refreshDate, setRefreshDate] = useState(formatDate(new Date()));

    useEffect(() => {
        setDataCopy(data);
    }, [data])


    useEffect(() => {
        const fetchFilmList = async () => {
            try {
                const params = {
                    size: 8,
                    page: 0,
                }
                const res = await filmAdminApi.getAll(params);
                setData(res);
                toasts.notifySuccess("lấy danh sách film thành công");
            } catch (error) {
                console.log("Failed to fetch film admin list :", error);
                toasts.notifyError("lấy danh sách phim thất bại");
            }
        }

        fetchFilmList();
    }, [])

    const Dispplay = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((film, index) => {
                return <ItemFirm key={index} film={film} setStatus={setStatus} setId={setId} />
            })
        }
        return result;
    }
    const onFilter = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let dataFilter = OnFilter(name, value, data);
        setDataCopy(dataFilter);
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
        const fetchFilmList = async () => {
            try {
                const params = {
                    size: 8,
                    page: 0,
                }
                const res = await filmAdminApi.getAll(params);
                setData(res);
                toasts.notifySuccess("lấy danh sách film thành công");
            } catch (error) {
                console.log("Failed to fetch film admin list :", error);
                toasts.notifyError("lấy danh sách phim thất bại");
            }
        }

        fetchFilmList();
    }

    return (
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
            </div>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Name Film</th>
                        <th>View</th>
                        <th>Tính phí</th>
                        <th>Hot</th>
                        <th>Active</th>
                        <th>Ngày Tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input type="text" name="nameFilm" className="form-control" onChange={onFilter} /></td>
                        <td><input type="text" name="countView" className="form-control" onChange={onFilter} /></td>
                        <td>
                            <select name="cost" className="form-control" onChange={onFilter}>
                                <option value={-1}>All</option>
                                <option value={1}>Cost</option>
                                <option value={0}>Free</option>
                            </select>
                        </td>
                        <td>
                            <select name="hot" className="form-control" onChange={onFilter}>
                                <option value={-1}>All</option>
                                <option value={1}>Hot</option>
                                <option value={0}>Normal</option>
                            </select>
                        </td>
                        <td>
                            <select name="active" className="form-control" onChange={onFilter}>
                                <option value={-1}>All</option>
                                <option value={1}>Active</option>
                                <option value={0}>UnActive</option>
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {Dispplay(dataCopy)}
                </tbody>
            </Table>
        </div>
    )
}

export default FilmDisplay
