import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { Note } from './note/note.entity';

@Module({
  imports: [
    NoteModule,
    CommonModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        useNewUrlParser: true,
        entities: [Note],
        synchronize: true,
      })
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        typePaths: ['./src/**/*.graphql'],
        installSubscriptionHandlers: true,
        introspection: true,
        formatError: err => err
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
