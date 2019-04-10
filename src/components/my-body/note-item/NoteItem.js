import React from 'react'
import { Row, Col, Icon, Button, Input } from 'antd'
import 'antd/dist/antd.css'
import './NoteItem.css'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

class NoteItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { value } = event.target
        let newNoteValue = Object.assign({}, this.props.noteValue)
        newNoteValue.saved = false
        newNoteValue.content = value
        this.props.onNoteChange(newNoteValue, this.props.index)
    }

    CREATE_NOTE = gql`
        mutation create($data: DataInputNote!) {
            createNote(dataInputNote: $data) {
                _id
                content
                time
                saved
                isActive
            }
        }
    `;

    UPDATE_NOTE = gql`
        mutation update($id: ID!, $data: DataInputNote!) {
            updateNote(_id: $id, dataInputNote: $data) {
                _id
                content
                time
                saved
                isActive
            }
        }
    `;

    REMOVE_NOTE = gql`
        mutation remove($inputId: ID!) {
            removeNote(_id: $inputId)
        }
    `;

    render() {
        return (
            <Mutation mutation={this.UPDATE_NOTE} >
                {(updateNote) => (
                    <Mutation mutation={this.CREATE_NOTE}>
                        {(createNote) => (
                            <Mutation
                                mutation={this.REMOVE_NOTE}
                                variables={{ inputId: this.props.noteValue._id }}
                            >
                                {(removeNote) => (
                                    <div>
                                        {this.props.noteValue.isActive ?
                                            <Row type="flex" justify="end" className="margin" >
                                                <Col className="note-input">
                                                    {this.props.noteValue.saved ?
                                                        <p
                                                            className="note-text"
                                                            onDoubleClick={() => this.props.onNoteChange({ saved: false, content: this.props.noteValue.content }, this.props.index)}
                                                        >{this.props.noteValue.content}</p>
                                                        :
                                                        <Input
                                                            name="content"
                                                            value={this.props.noteValue.content}
                                                            onChange={this.handleChange}
                                                            onBlur={() => {
                                                                // update state on client
                                                                this.props.onNoteChange({ saved: true, content: this.props.noteValue.content }, this.props.index)
                                                                this.props.noteValue._id ?
                                                                    // call mutation, pass in variables option
                                                                    updateNote({
                                                                        variables: {
                                                                            id: this.props.noteValue._id,
                                                                            data: {
                                                                                content: this.props.noteValue.content,
                                                                                saved: true
                                                                            }
                                                                        }
                                                                    })
                                                                    :
                                                                    // call mutation, pass in variables option
                                                                    createNote({
                                                                        variables: {
                                                                            data: {
                                                                                content: this.props.noteValue.content,
                                                                                saved: true
                                                                            }
                                                                        }
                                                                    })
                                                            }}
                                                            placeholder="Note content"
                                                        />}
                                                </Col>

                                                <Col className="note-tools">
                                                    <Row type="flex" justify="end">
                                                        <Button
                                                            disabled={this.props.noteValue.saved ? true : false}
                                                            onClick={() => {
                                                                // update state on client
                                                                this.props.onNoteChange({ saved: true, content: this.props.noteValue.content }, this.props.index)
                                                                this.props.noteValue._id ?
                                                                    // call mutation, pass in variables option for update
                                                                    updateNote({
                                                                        variables: {
                                                                            id: this.props.noteValue._id,
                                                                            data: {
                                                                                content: this.props.noteValue.content,
                                                                                saved: true
                                                                            }
                                                                        }
                                                                    })
                                                                    :
                                                                    // call mutation, pass in variables option for create
                                                                    createNote({
                                                                        variables: {
                                                                            data: {
                                                                                content: this.props.noteValue.content,
                                                                                saved: true
                                                                            }
                                                                        }
                                                                    })
                                                            }}
                                                        ><Icon type="save" /></Button>
                                                        <Button
                                                            type="danger"
                                                            onClick={() => {
                                                                this.props.onRemoveNote(this.props.index);
                                                                removeNote();
                                                            }}
                                                        ><Icon type="delete" /></Button>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            : <div></div>
                                        }
                                    </div>
                                )}
                            </Mutation>
                        )}
                    </Mutation>
                )}
            </Mutation>
        )
    }
}
export default NoteItem