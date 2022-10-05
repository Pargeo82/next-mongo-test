import dbConnect from "../lib/dbConnect";
import Pice from "../models/Pice";

export const getPica = async () => await Pice.find({});

export const getPice = async (id) => await Pice.findById(id);

export const createPice = async (novoPice) => await Pice.create(novoPice);

export const updatePice = async (id, updatePice) =>
  await Pice.findByIdAndUpdate(id, updatePice, { new: true });

export const deletePice = async (id) => await Pice.findByIdAndRemove(id);
