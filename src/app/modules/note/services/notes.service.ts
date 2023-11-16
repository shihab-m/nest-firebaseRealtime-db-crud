import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { Note } from '../models/note.model';
import { SuccessResponse } from 'src/app/application_module/types/successResponse.type';

@Injectable()
export class NotesService {
  private readonly db = admin.database();

  async createNote(note: Note): Promise<any> {
    const newNoteRef = this.db.ref('notes').push();
    await newNoteRef.set(note);

    const createdNoteSnapShot = await newNoteRef.once('value')

    return {
      id: newNoteRef.key,
      ...createdNoteSnapShot.val()
    };
  }

  async getAllNotes(): Promise<Note[]> {
    const snapshot = await this.db.ref('notes').once('value');
    const notes = snapshot.val();

    // transform to list before return
    return notes ? Object.keys(notes).map(key => ({
      id: key,
      ...notes[key]
    })) : []
  }

  async getNoteById(id: string,): Promise<Note> {
    const snapshot = await this.db.ref(`notes/${id}`).once('value');
    const note = snapshot.val()
    return note ? { id, ...note } : new NotFoundException('Note Not Found!');
  }

  async updateNoteById(id: string, note: Note): Promise<Note> {

    const noteRef = this.db.ref(`notes/${id}`);
    const existingNote = await noteRef.once('value');

    if (existingNote.val()) {
      await noteRef.update(note);
      const updatedNoteSnap = await noteRef.once('value');
      const updatedNote = updatedNoteSnap.val()
      return {
        id,
        ...updatedNote
      }
    } else {
      
      throw new NotFoundException("Note not found");
    }
  }

  async deleteNoteById(id: string): Promise<SuccessResponse | NotFoundException> {
    const noteRef = this.db.ref(`notes/${id}`);
    const existingNote = await noteRef.once('value');

    if (existingNote.val()) {
      await this.db.ref(`notes/${id}`).remove();
      return new SuccessResponse({
        message:"Note Deleted Sussessfully"
      })
    } else {
      throw new NotFoundException("Note not found");
    }
  }

}