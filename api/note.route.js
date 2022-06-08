const {auth} = require('../middlewear/auth');
const { addNote, getNotes, updateNote, deleteNote } = require('../services/note.services');

const Router = require('express').Router();

Router.route('/').post(auth(),addNote).get(getNotes).put(updateNote).delete(deleteNote);

module.exports=Router