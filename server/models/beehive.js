const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeehiveSchema = new Schema({
  apiary: {
    type: Schema.Types.ObjectId,
    ref: 'apiary'
  },
  content: {
    type: Schema.Types.String
  },
  colors: {
    type: Schema.Types.Array
  }
});

mongoose.model('beehive', BeehiveSchema);