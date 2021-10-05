import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap';
import { PublicContext } from '../../publicContexts/contexts';
import viewApi from '../../api/view/viewApi';
import styles from './styles.module.scss';
const ViewEdit = () => {
    const [data, setData] = useState({ countView: 0 });
    const { viewSelect } = useContext(PublicContext);

    useEffect(() => {
        setData(viewSelect);
    }, [viewSelect])

    const onSaveFilm = (e) => {
        e.preventDefault();
        const updateView = async () => {
            try {
                const res = await viewApi.updateView(data?.id, data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        updateView();

    }

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setData({ ...data, [name]: value })

    }

    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col}>
                        <div className="form-group">
                            <input required name="countView" value={data?.countView} type="text" className="form-control" placeholder="countView" onChange={onChangeData} />
                        </div>
                    </Col >
                </Row>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}

export default ViewEdit
