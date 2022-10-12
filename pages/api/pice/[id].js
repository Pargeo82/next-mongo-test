import { getPice, updatePice, deletePice } from "../../../utils/actions";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const id = req.query.id;
  const session = await getSession({ req });

  try {
    switch (req.method) {
      case "GET":
        res.json(await getPice(id));
        break;

      case "PUT":
        if (!session) {
          res.status(401).json({ error: "Unauthenticated user" });
        } else {
          res.json(await updatePice(id, req.body));
          break;
        }

      case "DELETE":
        if (!session) {
          res.status(401).json({ error: "Unauthenticated user" });
        } else {
          res.json(await deletePice(id));
          break;
        }
      default:
        res.status(404).send("No response for that method");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
