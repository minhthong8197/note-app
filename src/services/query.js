import gql from 'graphql-tag'

const NOTES = gql`
    query notes {
        notes {
            _id
            content
            time
            saved
            isActive
        }
    }`

const CREATE_NOTE = gql`
    mutation create($data: DataInputNote!) {
        createNote(dataInputNote: $data) {
            _id
            content
            time
            saved
            isActive
        }
    }`

const UPDATE_NOTE = gql`
    mutation update($id: ID!, $data: DataInputNote!) {
        updateNote(_id: $id, dataInputNote: $data) {
            _id
            content
            time
            saved
            isActive
        }
    }`

const REMOVE_NOTE = gql`
    mutation remove($inputId: ID!) {
        removeNote(_id: $inputId)
    }`

export {
    NOTES,
    CREATE_NOTE,
    UPDATE_NOTE,
    REMOVE_NOTE
}