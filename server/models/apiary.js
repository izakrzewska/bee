const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApiarySchema = new Schema({
  name: String,
  coordinates: {
    lng: {
      type: Schema.Types.Number
    },
    lat: {
      type: Schema.Types.Number
    }
  },
  beehives: [
    {
      type: Schema.Types.ObjectId,
      ref: "beehive"
    }
  ],
  numberOfBeehivesInRow: {
    type: Schema.Types.Number,
    default: 1
  },
  active: {
    type: Schema.Types.Boolean,
    default: true
  }
});

ApiarySchema.statics.addBeehive = function(
  apiaryId,
  colors,
  active,
  statuses,
  position
) {
  const Beehive = mongoose.model("beehive");

  return this.findById(apiaryId).then(apiary => {
    const beehive = new Beehive({
      apiaryId,
      colors,
      active,
      statuses,
      position
    });
    apiary.beehives.push(beehive);
    return Promise.all([beehive.save(), apiary.save()]).then(
      ([beehive, apiary]) => apiary
    );
  });
};

ApiarySchema.statics.findApiary = function(id) {
  return this.findById(id)
    .populate("beehives")
    .then(apiary => apiary.beehives);
};

ApiarySchema.statics.desactivateApiary = function(apiaryId) {
  return this.findById(apiaryId)
    .populate("beehives")
    .then(apiary => {
      apiary.beehives.map(beehive => {
        if (beehive.active) {
          beehive.active = false;
        }
        beehive.save();
      });
      apiary.active = !apiary.active;
      return Promise.all([apiary.save()]).then(([apiary]) => apiary);
    });
};

mongoose.model("apiary", ApiarySchema);
