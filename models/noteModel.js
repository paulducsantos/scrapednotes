var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ScrapedData = require('./scrapedModel.js');

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
  }, function(err, theNote) {
    theNote.remove();
  });
}

//this isnt working for some reason
// NoteSchema.post('remove', function(doc){
//   debugger;
//   this.model('ScrapedData').update(
//       {_id: this._id}, 
//       {$pull: {notes: this._id}},
//       doc
//   );
// });

NoteSchema.post('remove', function() {
  ScrapedData.ScrapedData.remove({ 'notes': this._id }).exec();

});


var Note = mongoose.model('Note', NoteSchema);
exports.Note = Note;
exports.deleteNote = deleteNote;