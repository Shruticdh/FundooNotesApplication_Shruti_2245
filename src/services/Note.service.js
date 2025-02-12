import Note from '../models/note.model';
import HttpStatus from 'http-status-codes';

export const createNote = async (body) => {
  try {
    const data = await Note.create(body);
    return {
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created Successfully!'
    };
  } catch (error) {
    return { error: error.message };
  }
};

export const updateNote = async (_id, body) => {
    try{
        const note = await Note.findById(_id);
        if (!note) {
            return { message: 'Note not found' };
        }
        if(note.isTrash === true){
            return {message: 'no notes'};
        }
        console.log("updated user");
        const data = await Note.findByIdAndUpdate(_id,body,{new: true});
        return data;
    } catch (error) {
        return {error: error.message};
    }
};

export const deleteNote = async (_id) => {
    try {
      const note = await Note.findById(_id);
      if (!note) {
        return { error: 'Note not found' };
      }
  
      const data = await Note.findByIdAndUpdate(
        _id,
        { isTrash: note.isTrash ? false : true },
        { new: true }
      );
  
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };
  