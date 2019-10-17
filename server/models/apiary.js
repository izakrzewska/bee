const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApiarySchema = new Schema({
  name: { type: String },
//   coordinates: {
//     longitud: {
//         type: Schema.Types.String
//     },
//     latitude: {
//         type: Schema.Types.String   
//     }
//   }
  beehives: [{
    type: Schema.Types.ObjectId,
    ref: 'beehive'
  }]
});

ApiarySchema.statics.addBeehive = function(apiaryId, content, colors) {
  const Beehive = mongoose.model('beehive');

  return this.findById(apiaryId)
    .then(apiary => {
      const beehive = new Beehive({apiaryId, content, colors})
      apiary.beehives.push(beehive)
      return Promise.all([beehive.save(), apiary.save()])
        .then(([beehive, apiary]) => apiary);
    });
}

ApiarySchema.statics.findApiary = function(id) {
  return this.findById(id)
    .populate('beehives')
    .then(apiary => apiary.beehives);
}

mongoose.model('apiary', ApiarySchema);