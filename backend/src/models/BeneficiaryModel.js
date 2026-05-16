import mongoose from "mongoose";

const beneficiarySchema =
new mongoose.Schema(
{


  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },

  phone: {
    type: String,
  },

  region: {
    type: String,
  },

  village: {
    type: String,
  },

  assistance: {
    type: String,
  },

  registeredBy: {

    type:
      mongoose.Schema.Types.ObjectId,

    ref: "User",
  },
},

{
  timestamps: true,
}


);

const Beneficiary =
mongoose.models.Beneficiary ||

mongoose.model(
"Beneficiary",
beneficiarySchema
);

export default Beneficiary;
