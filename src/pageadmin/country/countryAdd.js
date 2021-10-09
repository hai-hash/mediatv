import React, { useState, useContext } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import countryAdminApi from '../../api/country/countryApi';
import * as toasts from './../../library/toast/toast';
import { PublicContext } from '../../publicContexts/contexts';
const CountryAdd = () => {
    const { infoAccount } = useContext(PublicContext);
    const [data, setdata] = useState({ createBy: infoAccount?.username ? infoAccount?.username : "" });

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setdata({ ...data, [name]: value })

    }

    const onSaveFilm = (e) => {
        e.preventDefault();
        const fetchCreateCountry = async () => {
            try {
                const res = await countryAdminApi.post(data);
                console.log(res);
                toasts.notifySuccess("Thêm country thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("Thêm country thất bại");
            }
        }

        fetchCreateCountry();
    }
    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col}>
                        <div className="form-group">
                            <input required name="nameCountry" type="text" className="form-control" placeholder="nameCountry" onChange={onChangeData} />
                        </div>
                    </Col >
                </Row>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        </div>
    )
}

export default CountryAdd
