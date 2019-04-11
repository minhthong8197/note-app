import React from 'react'
import { Row, Col, Icon, Button, Input } from 'antd'
import 'antd/dist/antd.css'
import './NoteItem.css'
import { Mutation } from 'react-apollo'
// eslint-disable-next-line
import { NOTES, CREATE_NOTE, UPDATE_NOTE, REMOVE_NOTE } from '../../../services/query'

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

    render() {
        return (
            <Mutation
                mutation={UPDATE_NOTE}
            /*update={(cache, { data: { updateNote } }) => {
                try {
                    const data = cache.readQuery({ query: NOTES })
                    console.log('notes', data.notes[data.notes.length - 1])
                    data.notes = data.notes.map(note => {
                        if (note._id === updateNote._id) note = updateNote;
                        return note
                    })
                    console.log('notes after', data.notes[data.notes.length - 1])
                    cache.writeQuery({
                        query: NOTES,
                        data: data
                    });
                } catch (error) {
                    console.log(error)
                }
            }}*/
            >
                {(updateNote) => (
                    <Mutation
                        mutation={CREATE_NOTE}
                    /*update={(cache, { data: { createNote } }) => {
                        try {
                            const data = cache.readQuery({ query: NOTES })
                            data.notes.push(createNote)
                            cache.writeQuery({
                                query: NOTES,
                                data: data
                            });
                        } catch (error) {
                            console.log(error)
                        }
                    }}*/
                    >
                        {(createNote) => (
                            <Mutation
                                mutation={REMOVE_NOTE}
                                variables={{ inputId: this.props.noteValue._id }}

                            /*update={(cache, { data: { removeNote } }) => {
                                try {
                                    const notes = cache.readQuery({ query: NOTES });
                                    notes.notes = notes.notes.map(note => {
                                        if (note._id === removeNote) note.isActive = false;
                                        return note
                                    })
                                    cache.writeQuery({
                                        query: NOTES,
                                        data: notes
                                    });
                                } catch (error) {
                                    console.log(error)
                                }
                            }}*/
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
                                                                // this.props.onNoteChange({ saved: true, content: this.props.noteValue.content }, this.props.index)
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
                                                                this.props.refetchData()
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
                                                                // this.props.onNoteChange({ saved: true, content: this.props.noteValue.content }, this.props.index)
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
                                                                this.props.refetchData()
                                                            }}
                                                        ><Icon type="save" /></Button>
                                                        <Button
                                                            type="danger"
                                                            onClick={async () => {
                                                                // this.props.onRemoveNote(this.props.index);
                                                                removeNote()
                                                                this.props.refetchData()
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