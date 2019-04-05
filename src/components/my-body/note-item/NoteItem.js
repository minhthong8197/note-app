import React from 'react'
import { Row, Col, Icon, Button, Input } from 'antd'
import 'antd/dist/antd.css'
import './NoteItem.css'



class NoteItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { value } = event.target
        this.props.onNoteChange({ saved: false, content: value }, this.props.index);
    }

    render() {
        return (
            <Row type="flex" justify="end" className="margin" >
                <Col className="note-input">
                    {
                        this.props.noteValue.saved ?
                            <p
                                className="note-text"
                                onDoubleClick={() => this.props.onNoteChange({ saved: false, content: this.props.noteValue.content }, this.props.index)}
                            >{this.props.noteValue.content}</p> :
                            <Input
                                name="content"
                                value={this.props.noteValue.content}
                                onChange={this.handleChange}
                                onBlur={() => this.props.onNoteChange({ saved: true, content: this.props.noteValue.content }, this.props.index)}
                                placeholder="Note content"
                            />
                    }
                </Col>
                <Col className="note-tools">
                    <Row type="flex" justify="end">
                        <Button
                            disabled={this.props.noteValue.saved ? true : false}
                            onClick={() => this.props.onNoteChange({ saved: true, content: this.props.noteValue.content }, this.props.index)}
                        ><Icon type="save" /></Button>
                        <Button
                            type="danger"
                            onClick={() => this.props.onRemoveNote(this.props.index)}
                        ><Icon type="delete" /></Button>
                    </Row>
                </Col>
            </Row>
        )
    }
}
export default NoteItem