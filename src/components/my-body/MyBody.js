import React from 'react'
import { Row, Col } from 'antd'
import 'antd/dist/antd.css'

import './MyBody.css'
import AddNoteItem from './add-note-item/AddNoteItem'
import NoteItem from './note-item/NoteItem'

class MyBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listNotes: [],
        }
        this.onAddNote = this.onAddNote.bind(this)
        this.onRemoveNote = this.onRemoveNote.bind(this)
        this.onNoteChange = this.onNoteChange.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        if (state.listNotes.length === 0) return { listNotes: [...props.listNotes] }
        else {
            return state
        }
        // return { listNotes: [...props.listNotes] }
    }

    renderNoteItems() {
        return this.state.listNotes.map((noteValue, i) =>
            (
                <NoteItem
                    key={i}
                    index={i}
                    noteValue={noteValue}
                    onRemoveNote={this.onRemoveNote}
                    onNoteChange={this.onNoteChange}
                />
            ))
    }

    onAddNote() {
        let newList = [...this.state.listNotes]
        newList.push({
            saved: false,
            content: '',
            isActive: true
        });
        this.setState({
            listNotes: newList
        })
    }

    onRemoveNote(i) {
        let newList = [
            ...this.state.listNotes.slice(0, i),
            ...this.state.listNotes.slice(i + 1)
        ]
        this.setState({
            listNotes: newList
        })
    }

    onNoteChange(noteValue, i) {
        let newList = [...this.state.listNotes]
        newList[i] = Object.assign(newList[i], noteValue)
        this.setState({
            listNotes: newList
        })
    }

    render() {
        return (
            < Row >
                <Col xs={{ span: 24 }} sm={{ span: 18, offset: 3 }} lg={{ span: 12, offset: 6 }} className="gray-back">
                    {this.renderNoteItems()}
                    <AddNoteItem onAddNote={this.onAddNote} />
                </Col>
            </Row >
        )
    }
}
export default MyBody