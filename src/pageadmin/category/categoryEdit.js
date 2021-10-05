import React, { useState, useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import categoryAdminApi from '../../api/category/categoryApi';
import { PublicContext } from '../../publicContexts/contexts';
import * as toasts from './../../library/toast/toast';
const CategoryEdit = () => {
    const [data, setData] = useState({ id: "", nameCategory: "" });

    const { categorySelect } = useContext(PublicContext);

    useEffect(() => {
        setData(categorySelect);
    }, [categorySelect])

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setData({ ...data, [name]: value })

    }

    const onSaveFilm = (e) => {
        e.preventDefault();
        const fetchUpdateCategory = async () => {
            try {
                const res = await categoryAdminApi.put(data, data?.id);
                console.log(res);
                toasts.notifySuccess("cập nhật thông tin category thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("cập nhật thông tin category thất bại");
            }
        }

        fetchUpdateCategory();
    }

    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col}>
                        <div className="form-group">
                            <input value={data?.nameCategory ? data?.nameCategory : ""} required name="nameCategory" type="text" className="form-control" placeholder="nameCategory" onChange={onChangeData} />
                        </div>
                    </Col >
                </Row>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        </div>
    )
}

export default CategoryEdit
