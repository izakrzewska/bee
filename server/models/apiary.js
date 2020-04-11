const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApiarySchema = new Schema({
  name: String,
  coordinates: {
    lng: {
      type: Schema.Types.Number,
    },
    lat: {
      type: Schema.Types.Number,
    },
  },
  beehives: [
    {
      type: Schema.Types.ObjectId,
      ref: 'beehive',
    },
  ],
  numberOfBeehivesInRow: {
    type: Schema.Types.Number,
    default: 1,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
});

ApiarySchema.statics.addBeehive = function (
  apiaryId,
  colors,
  active,
  statuses,
  position,
) {
  const Beehive = mongoose.model('beehive');

  return this.findById(apiaryId).then((apiary) => {
    const beehive = new Beehive({
      apiaryId,
      colors,
      active,
      statuses,
      position,
    });
    apiary.beehives.push(beehive);
    return Promise.all([beehive.save(), apiary.save()]).then(
      ([beehive, apiary]) => apiary,
    );
  });
};

ApiarySchema.statics.findApiary = function (id) {
  return this.findById(id)
    .populate('beehives')
    .then((apiary) => apiary.beehives);
};

ApiarySchema.statics.updateApiary = function (data) {
  return this.findById(data.id).then((apiary) => {
    apiary.colors = data.updatedApiary.colors;
    apiary.active = data.updatedApiary.active;
    apiary.statuses = data.updatedApiary.statuses;
    apiary.position = data.updatedApiary.position;

    return Promise.all([apiary.save()]).then(([apiary]) => apiary);
  });
};

mongoose.model('apiary', ApiarySchema);
