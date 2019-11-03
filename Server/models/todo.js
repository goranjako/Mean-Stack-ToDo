var mongoose = require('mongoose');
var user = require('./users');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
},
  item: {
    type: String,
    required: true,
    unique: true
  },
  isCompleted:{
    type: Boolean, default: false
    
  }


 

});

module.exports = mongoose.model('Todo', TodoSchema);
