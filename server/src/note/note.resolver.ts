import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { NoteService } from "./note.service";
import { ApolloError } from "apollo-server-core";
import { async } from "q";
import { Note } from "./note.entity";

@Resolver('Note')
export class NoteResolver {
    constructor(private noteService: NoteService) { }

    @Query('notes')
    async notes() {
        try {
            return await this.noteService.getNotes()
        } catch (error) {
            throw new ApolloError(error)
        }
    }

    @Query('note')
    async note(@Args('_id') _id: string) {
        try {
            return await this.noteService.getNote(_id)
        } catch (error) {
            throw new ApolloError(error)
        }
    }

    @Mutation('createNote')
    async createNote(@Args('dataInputNote') dataInputNote: Note) {
        try {
            return await this.noteService.createNote(dataInputNote)
        } catch (error) {
            throw new ApolloError(error)
        }
    }

    @Mutation('updateNote')
    async updateNote(
        @Args('_id') _id: string,
        @Args('dataInputNote') dataInputNote: Note
    ) {
        try {
            return await this.noteService.updateNote(_id, dataInputNote)
        } catch (error) {
            throw new ApolloError(error)
        }
    }

    @Mutation('removeNote')
    async removeNote(@Args('_id') _id: string) {
        try {
            return this.noteService.removeNote(_id)
        } catch (error) {
            throw new ApolloError(error)
        }
    }
}