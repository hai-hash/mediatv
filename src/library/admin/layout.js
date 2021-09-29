import React, { useEffect, useContext } from 'react';
import Menu from './menu';
import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import BodyAdmin from './body';
export default function LayoutAdmin() {
    return (
        <>
            <Row>
                <Col xs="2">
                    <Menu />
                </Col>
                <Col xs="10">
                    <BodyAdmin />
                </Col>
            </Row>
        </>
    )
}
