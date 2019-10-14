const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeehiveSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  apiary: {
    type: Schema.Types.ObjectId,
    ref: 'apiary'
  },
  position: {
    row: {
        type: Schema.Types.Number
    },
    number: {
        type: Schema.Types.Number
    }
  },
  active: {
    type: Schema.Types.Boolean
  },
  statuses: {
    type: Schema.Types.Array
  },
  colors: {
    type: Schema.Types.Array
  }
});

// BeehiveSchema.statics.like = function(id) {
//   const Beehive = mongoose.model('beehive');

//   return Beehive.findById(id)
//     .then(beehive => {
//       ++beehive.likes;
//       return beehive.save();
//     })
// }

mongoose.model('beehive', BeehiveSchema);