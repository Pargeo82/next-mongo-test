import { getPica, createPice } from "../../../utils/actions";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        res.json(await getPica());
        break;

      case "POST":
        const session = await getSession({ req });
        if (!session) {
          res.status(401).json({ error: "Unauthenticated user" });
        } else {
          res.json(await createPice(req.body));
          break;
        }

      default:
        res.status(404).send("No response for that method");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
