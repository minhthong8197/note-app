import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { NoteService } from './note.service';
import { Note } from './note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteResolver } from './note.resolver';

@Module({
    imports: [CommonModule, TypeOrmModule.forFeature([Note])],
    providers: [NoteService, NoteResolver]
})
export class NoteModule { }
