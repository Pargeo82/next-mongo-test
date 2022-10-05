import { getPica, createPice } from "../../../utils/actions";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        res.json(await getPica());
        break;

      case "POST":
        res.json(await createPice(req.body));
        break;

      default:
        res.status(404).send("No response for that method");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
