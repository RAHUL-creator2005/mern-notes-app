import Note from "../models/Note.js";

/*
  GET all notes
*/
export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

/*
  CREATE a new note
*/
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  // Create a new note
  const note = new Note({
    title,
    content
  });

  // Save the note to database
  const savedNote = await note.save();

  // Return the saved note
  res.status(201).json(savedNote);
};

/*
  GET a single note by ID
*/
export const getNote = async (req, res) => {
  // Find the note by its ID from the URL parameters
  const note = await Note.findById(req.params.id);

  // If note not found, throw error (will be handled by middleware)
  if (!note) {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  }

  // Send the found note as response
  res.json(note);
};

/*
  UPDATE a note by ID
*/
export const updateNote = async (req, res) => {
  const { title, content } = req.body;

  // Find the note by ID and update it with new data
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id, // The ID from URL
    { title, content }, // The new data to update
    { new: true } // Return the updated note (not the old one)
  );

  // If note not found, throw error (will be handled by middleware)
  if (!updatedNote) {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  }

  // Send the updated note as response
  res.json(updatedNote);
};

/*
  DELETE a note by ID
*/
export const deleteNote = async (req, res) => {
  // Find and delete the note by ID
  const deletedNote = await Note.findByIdAndDelete(req.params.id);

  // If note not found, throw error (will be handled by middleware)
  if (!deletedNote) {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  }

  // Send success message
  res.json({ message: "Note deleted successfully" });
};

