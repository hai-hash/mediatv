import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'reactstrap';
import styles from './styles.module.scss';
import ItemCategory from './itemCategory';
import categoryAdminApi from '../../api/category/categoryApi';
import * as toasts from './../../library/toast/toast';
import { OnFilter, OnFilterByDate, formatDate } from './../../common/commonFuncition';
import { MdRefresh } from 'react-icons/md';
const CategoryDisplay = ({ setStatus }) => {
    const [data, setData] = useState([]);
    const [dataCopy, setDataCopy] = useState([]);
    const [date, setDate] = useState({ startDate: "", endDate: "" });
    const [refreshDate, setRefreshDate] = useState(formatDate(new Date()));

    useEffect(() => {
        setDataCopy(data);
    }, [data])


    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const params = {
                    size: 8,
                    page: 0,
                }
                const res = await categoryAdminApi.getAll(params);
                setData(res);
                toasts.notifySuccess("lấy danh sách category thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách category thất bại");
            }
        }

        fetchCategoryList();
    }, [])


    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((category, index) => {
                return <ItemCategory category={category} key={index} setStatus={setStatus} />
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
        const fetchCategoryList = async () => {
            try {
                const params = {
                    size: 8,
                    page: 0,
                }
                const res = await categoryAdminApi.getAll(params);
                setData(res);
                toasts.notifySuccess("lấy danh sách category thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách category thất bại");
            }
        }

        fetchCategoryList();
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
            <Table>
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Tiêu Đề</th>
                        <th>Người Tạo</th>
                        <th>Active</th>
                        <th>Ngày Tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input type="text" name="nameCategory" className="form-control" onChange={onFilter} placeholder='Tên Thể Loại' /></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {Display(dataCopy)}
                </tbody>
            </Table>
        </div>
    )
}

export default CategoryDisplay
