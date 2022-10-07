import mongoose from "mongoose";

const PiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Fali ime artikla"],
  },
  nameEng: {
    type: String,
    required: [true, "Fali ime artikla na engleskom"],
  },
  tip: {
    type: String,
    required: [true, "Fali tip artikla"],
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
    required: [true, "Fali mjera"],
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
    required: [true, "Nema cijene u kunama"],
    min: [0.01, "Cijena ne može biti 0"],
  },
  cijenaEUR: {
    type: Number,
    required: [true, "Nema cijene u eurima"],
    min: [0.01, "Cijena ne može biti 0"],
  },
});

export default mongoose.models.Pice || mongoose.model("Pice", PiceSchema);
