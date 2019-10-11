const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeehiveSchema = new Schema({
  apiary: {
    type: Schema.Types.ObjectId,
    ref: 'apiary'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

BeehiveSchema.statics.like = function(id) {
  const Beehive = mongoose.model('beehive');

  return Beehive.findById(id)
    .then(beehive => {
      ++beehive.likes;
      return beehive.save();
    })
}

mongoose.model('beehive', BeehiveSchema);