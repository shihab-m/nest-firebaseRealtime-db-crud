import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from '../dtos/note.dto';
import { Note } from '../models/note.model';

@ApiTags("Notes")
@Controller('notes')
export class NotesController {

    constructor(private readonly notesService: NotesService) { }

    @Get()
    async findAllNotes() {
        return this.notesService.getAllNotes()
    }

    @Get(':id')
    async getNoteById(@Param('id') id: string) {
        return this.notesService.getNoteById(id);
    }

    @Post()
    @ApiBody({
        type: CreateNoteDto
    })
    async createNote(@Body() notePayload: Note): Promise<Note> {
        return this.notesService.createNote(notePayload)
    }

    @ApiBody({
        type: CreateNoteDto
    })
    @Put(':id')
    async updateNote(@Param('id') id: string, @Body() note: Note): Promise<Note> {
        console.log(">>>>>",id)
        return this.notesService.updateNoteById(id, note)
    }

    @Delete(':id')
    async deleteNoteById(@Param("id") id: string){
        return this.notesService.deleteNoteById(id);
    }
}