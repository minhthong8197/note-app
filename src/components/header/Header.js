import React from 'react';
import { Row, Col } from 'antd';

import './Header.css'
import 'antd/dist/antd.css'

class Header extends React.Component {
    // constructor() {
    //     super()
    // }

    render() {
        return (
            <Row className="row" type="flex" justify="center" align="middle">
                <Col className="col" xs={{span: 22}} sm={{span: 18}} lg={{span: 12}}>
                    MY NOTE
                </Col>
            </Row>
        );
    }
}

export default Header