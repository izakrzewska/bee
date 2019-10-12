const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApiarySchema = new Schema({
  name: { type: String }
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'user'
//   },
//   beehives: [{
//     type: Schema.Types.ObjectId,
//     ref: 'beehive'
//   }]
});

ApiarySchema.statics.addBeehive = function(id, content) {
  const Beehive = mongoose.model('beehive');

  return this.findById(id)
    .then(apiary => {
      const beehive = new Beehive({ content, apiary })
      apiary.beehives.push(beehive)
      return Promise.all([beehive.save(), apiary.save()])
        .then(([beehive, apiary]) => apiary);
    });
}

ApiarySchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('beehives')
    .then(apiary => apiary.beehives);
}

mongoose.model('apiary', ApiarySchema);