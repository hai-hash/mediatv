import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import categoryAdminApi from '../../api/category/categoryApi';
import * as toasts from './../../library/toast/toast';
const CategoryAdd = () => {
    const [data, setdata] = useState({ nameCategory: "" });

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setdata({ ...data, [name]: value })

    }

    const onSaveFilm = (e) => {
        e.preventDefault();
        const fetchCreateCategory = async () => {
            try {
                const res = await categoryAdminApi.post(data);
                console.log(res);
                toasts.notifySuccess("Thêm category thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("Thêm category thất bại");
            }
        }

        fetchCreateCategory();
    }

    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col}>
                        <div className="form-group">
                            <input required name="nameCategory" type="text" className="form-control" placeholder="nameCategory" onChange={onChangeData} />
                        </div>
                    </Col >
                </Row>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        </div>
    )
}

export default CategoryAdd
