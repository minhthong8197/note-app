import React from 'react'
import { Row, Col, Icon, Button, Input } from 'antd'
import 'antd/dist/antd.css'
import './NoteItem.css'
import { graphql, compose } from 'react-apollo'
import {
  NOTES,
  CREATE_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE
} from '../../../services/query'

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
      <div>
        {this.props.noteValue.isActive ? (
          <Row type='flex' justify='end' className='margin'>
            <Col className='note-input'>
              {this.props.noteValue.saved ? (
                <p
                  className='note-text'
                  onDoubleClick={() =>
                    this.props.onNoteChange(
                      {
                        saved: false,
                        content: this.props.noteValue.content
                      },
                      this.props.index
                    )
                  }
                >
                  {this.props.noteValue.content}
                </p>
              ) : (
                <Input
                  name='content'
                  placeholder='Note content'
                  value={this.props.noteValue.content}
                  onChange={this.handleChange}
                />
              )}
            </Col>

            <Col className='note-tools'>
              <Row type='flex' justify='end'>
                <Button
                  disabled={this.props.noteValue.saved ? true : false}
                  onClick={async () => {
                    // call mutation, pass in variables option
                    this.props.noteValue._id
                      ? await this.props.updateNote({
                          variables: {
                            id: this.props.noteValue._id,
                            data: {
                              content: this.props.noteValue.content,
                              saved: true
                            }
                          }
                        })
                      : await this.props.createNote({
                          variables: {
                            data: {
                              content: this.props.noteValue.content,
                              saved: true
                            }
                          }
                        })
                    this.props.updateState()
                  }}
                >
                  <Icon type='save' />
                </Button>
                <Button
                  type='danger'
                  onClick={async () => {
                    await this.props.removeNote({
                      variables: { inputId: this.props.noteValue._id }
                    })
                    this.props.updateState()
                  }}
                >
                  <Icon type='delete' />
                </Button>
              </Row>
            </Col>
          </Row>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default compose(
  graphql(UPDATE_NOTE, {
    name: 'updateNote',
    options: {
      update: (dataProxy, { data: { updateNote } }) => {
        try {
          const data = dataProxy.readQuery({ query: NOTES })
          data.notes = data.notes.map(note => {
            if (note._id === updateNote._id) {
              note = Object.assign({}, updateNote)
            }
            return note
          })
          dataProxy.writeQuery({
            query: NOTES,
            data: data
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }),
  graphql(CREATE_NOTE, {
    name: 'createNote',
    options: {
      update: (cache, { data: { createNote } }) => {
        try {
          const data = cache.readQuery({ query: NOTES })
          data.notes.push(createNote)
          cache.writeQuery({
            query: NOTES,
            data: data
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }),
  graphql(REMOVE_NOTE, {
    name: 'removeNote',
    options: {
      update: (cache, { data: { removeNote } }) => {
        try {
          const data = cache.readQuery({ query: NOTES })
          data.notes = data.notes.map(note => {
            if (note._id === removeNote) note.isActive = false
            return note
          })
          cache.writeQuery({
            query: NOTES,
            data: data
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
)(NoteItem)
