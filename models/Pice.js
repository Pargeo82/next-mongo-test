import mongoose from "mongoose";

const PiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Moraš imati ime artikla"],
  },
  nameEng: {
    type: String,
    required: [true, "Fali ti ime artikla na engleskom"],
  },
  tip: {
    type: String,
    required: [true, "Fali ti tip artikla"],
    enum: [
      "napitci",
      "gazirano",
      "sokovi",
      "mineralna",
      "tocenoPivo",
      "pivo",
      "zestoka",
      "vino",
      "trgovacka",
      "stranaZestoka",
    ],
  },
  mjera: {
    type: String,
    required: [true, "Fali ti mjera"],
    enum: [
      "kom",
      "por",
      "0.1l",
      "0.2l",
      "0.25l",
      "0.3l",
      "0.33l",
      "0.02l",
      "0.03l",
      "0.05l",
      "0.5l",
      "0.75l",
      "1l",
      "šalica",
    ],
  },
  cijenaKN: {
    type: Number,
    required: [true, "Nemaš cijenu u kunama"],
  },
  cijenaEUR: {
    type: Number,
    required: [true, "Nemaš cijenu u eurima"],
  },
});

export default mongoose.models.Pice || mongoose.model("Pice", PiceSchema);
