import { getPice, updatePice, deletePice } from "../../../utils/actions";

export default async function handler(req, res) {
  const id = req.query.id;

  try {
    switch (req.method) {
      case "GET":
        res.json(await getPice(id));
        break;

      case "PUT":
        res.json(await updatePice(id, req.body));
        break;

      case "DELETE":
        res.json(await deletePice(id));
        break;

      default:
        res.status(404).send("No response for that method");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
