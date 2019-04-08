import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from "@nestjs/common";
import { getMongoRepository } from "typeorm";

import { Note } from './note.entity';
import { any } from 'prop-types';


@Injectable()
export class NoteService {
    constructor(@InjectRepository(Note) private noteRepository = getMongoRepository(Note)) { }

    async getNotes(): Promise<Note[] | any> {
        return await this.noteRepository.find()
    }

    async getNote(_id: string): Promise<Note | any> {
        return await this.noteRepository.findOne({ _id })
    }

    async createNote(noteData: Note) {
        const newNote = new Note(noteData);
        await this.noteRepository.insertOne(newNote);
        return await this.noteRepository.findOne({ _id: newNote._id })
    }

    async updateNote(noteId: string, noteData) {
        const updated = await this.noteRepository.findOneAndUpdate(
            { _id: noteId },
            { $set: { ...noteData } }
        )
        return await this.getNote(noteId);
    }

    async removeNote(noteId: string) {
        const removed = this.noteRepository.findOneAndUpdate(
            { _id: noteId },
            { $set: { isActive: false } }
        )
        return noteId
    }
}