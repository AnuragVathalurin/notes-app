const { notDeepEqual } = require("assert");
const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Your Notes...";

const addNote = (title, body) => {
  const notes = loadNotes();
  //const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log("New Note Added!");
  } else {
    console.log("Note Title is Taken.");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);

  if (notes.length === filteredNotes.length) {
    console.log(chalk.red.inverse("Note does not exist!"));
  } else {
    console.log(chalk.green.inverse(title + " has been deleted."));
    saveNotes(filteredNotes);
  }
};

const listNotes = () => {
  const allNotes = loadNotes();
  console.log(chalk.inverse("Your Notes: "));
  allNotes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();
  const foundNote = notes.find((note) => note.title === title);

  if (!foundNote) {
    console.log(chalk.red.inverse("Note does not exist!"));
  } else {
    console.log(chalk.blue.inverse(foundNote.title + ": "));
    console.log(foundNote.body);
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
