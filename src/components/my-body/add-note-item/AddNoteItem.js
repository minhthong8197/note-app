import React from 'react'

import { Row, Col, Button } from 'antd'
import 'antd/dist/antd.css'

import './AddNoteItem.css'


function AddNoteItem(props) {
    return (
        <Row type="flex" >
            <Col className="align-right" span={24}>
                <Button
                    type="primary"
                    shape="circle"
                    icon="plus-circle"
                    size="large"
                    onClick={() => props.onAddNote()}
                />
            </Col >
        </Row >
    )
}
export default AddNoteItem