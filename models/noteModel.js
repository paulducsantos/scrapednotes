var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  note: {
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var deleteNote = function(id) {
  return Note.findOne({
    _id: id
  }).remove();
}

//this isnt working for some reason
Note.post('remove', function(next){
  debugger;
  this.model('ScrapedData').update(
      {_id: this._id}, 
      {$pull: {notes: this._id}},
      next
  );
});

var Note = mongoose.model('Note', NoteSchema);
exports.Note = Note;
exports.deleteNote = deleteNote;