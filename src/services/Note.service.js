/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
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
        if(body.userId !== note.userId){
          return {message:'you are not authorized person'}
        }
        console.log("updated user");
        const data = await Note.findByIdAndUpdate(_id,body,{new: true});
        return data;
    } catch (error) {
        return {error: error.message};
    }
};

export const deleteNote = async (_id , body) => {
    try {
      const note = await Note.findById(_id);
      if (!note) {
        return { error: 'Note not found' };
      }
  
      if(body.userId !== note.userId){
        return {message:'you are not authorized person'}
      }

      const data = await Note.findByIdAndUpdate(
        _id,
        { isTrash: note.isTrash ? false : true },
        { new: true }
      );
  
      return {message:'deleted sucessfully' , data};

    } catch (error) {
      return { error: error.message };
    }
  };
  
  export const getAllNotes = async () => {
    try{
    const data = await Note.find();
    return data;
    } catch (error){
      return {error: error.message};
    }
  }

  export const getNoteByUserId = async (_id , body) => {
    try{
    const note = await Note.findById(_id);
    if(!note){
      return {message: 'Note not find'}
    }
    console.log('---->',note);
    console.log('---->',body.userId);
    console.log('---->',note.userId);
    if(body.userId !== note.userId){
      return {message: 'Invalid UserId'};
    }
    const data = await Note.findById(_id);
    return note;
  } catch(error){
    return {error: error.message};
  }
  }
  