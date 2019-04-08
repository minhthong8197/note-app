import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { v1 as uuidv1 } from 'uuid'

@Entity({ name: 'note' })
export class Note {
    @ObjectIdColumn() _id?: string
    @Column() content: string
    @Column() time: Date
    @Column() isActive: boolean

    constructor(noteData) {
        if (noteData) {
            Object.assign(this, noteData, { _id: uuidv1(), isActive: true, time: new Date() })
        }
    }
}