const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BeehiveSchema = new Schema({
  apiary: {
    type: Schema.Types.ObjectId,
    ref: "apiary"
  },
  colors: {
    type: [Schema.Types.String],
    default: []
  },
  active: {
    type: Schema.Types.Boolean,
    default: false
  },
  statuses: {
    type: Schema.Types.Array,
    default: []
  },
  position: {
    row: {
      type: Schema.Types.Number,
      default: 0
    },
    number: {
      type: Schema.Types.Number,
      default: 0
    }
  }
});

BeehiveSchema.statics.updateBeehive = function(data) {
  return this.findById(data.id).then(beehive => {
    beehive.colors = data.beehiveUpdated.colors;
    beehive.active = data.beehiveUpdated.active;
    beehive.statuses = data.beehiveUpdated.statuses;
    beehive.position = data.beehiveUpdated.position;

    return Promise.all([beehive.save()]).then(([beehive]) => beehive);
  });
};

mongoose.model("beehive", BeehiveSchema);
