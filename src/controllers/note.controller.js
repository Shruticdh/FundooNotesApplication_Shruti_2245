import * as NoteService from '../services/Note.service';

export const createNote = async (req, res) => {
  try {
    const data = await NoteService.createNote(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};
