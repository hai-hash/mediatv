import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import ItemCategory from './itemCategory';
import categoryAdminApi from '../../api/category/categoryApi';
import * as toasts from './../../library/toast/toast';
const CategoryDisplay = ({ setStatus }) => {
    const [data, setData] = useState([]);

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

    return (
        <div className={styles.table}>
            <Table striped>
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Tiêu Đề</th>
                        <th>Ngày Tạo</th>
                        <th>Người Tạo</th>
                        <th>Active</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {Display(data)}
                </tbody>
            </Table>
        </div>
    )
}

export default CategoryDisplay
