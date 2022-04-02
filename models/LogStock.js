const { Schema, model } = require("mongoose");

const logSchema = new Schema({
  idProducto: String,
  fechaLog: Date,
  cantidad: Number,
  motivo: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

logSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Log = model("logs", logSchema);

module.exports = Log;
