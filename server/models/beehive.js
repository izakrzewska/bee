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
    type: Schema.Types.Array,
    default: []
  },
  active: {
    type: Schema.Types.Boolean,
    default: false
  },
  statuses: {
    type: Schema.Types.Array,
    default: []
  }
});

mongoose.model('beehive', BeehiveSchema);