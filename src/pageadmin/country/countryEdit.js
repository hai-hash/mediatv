import React, { useState, useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import countryAdminApi from '../../api/country/countryApi';
import * as toasts from './../../library/toast/toast';
import { PublicContext } from '../../publicContexts/contexts';

const CountryEdit = () => {
    const { infoAccount, countrySelect } = useContext(PublicContext);
    const [data, setdata] = useState({ nameCountry: "", createBy: infoAccount?.username ? infoAccount?.username : "" });

    useEffect(() => {
        setdata(countrySelect);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setdata({ ...data, [name]: value })

    }
    const onSaveFilm = (e) => {
        e.preventDefault();
        const fetchUpdateCountry = async () => {
            try {
                const res = await countryAdminApi.update(data, data?.id);
                console.log(res);
                toasts.notifySuccess("cập nhật country thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("cập nhật country thất bại");
            }
        }

        fetchUpdateCountry();
    }
    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col}>
                        <div className="form-group">
                            <input required name="nameCountry" value={data?.nameCountry ? data?.nameCountry : ""} type="text" className="form-control" placeholder="nameCountry" onChange={onChangeData} />
                        </div>
                    </Col >
                </Row>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>

        </div>
    )
}

export default CountryEdit
