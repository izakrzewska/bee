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

mongoose.model("beehive", BeehiveSchema);
