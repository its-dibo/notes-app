import { Request, Response } from "express";
import db from "~database";

/**
 * Endpoint that can be used by the user to list his timeline notes
 * in the last 30 days with non-disabled types
 *
 * - could be filtered by one or more type
 * - supports pagination
 */
export default function (req: Request, res: Response) {
  let userId = req.url.split("/")[2],
    condition = userId !== "all" ? `where user=${userId}` : "";

  // todo: get enabled notes only
  db.all(
    `select * from notes ${condition}`,
    function (error: Error, rows: any[]) {
      if (error) {
        res.status(500).json({ error });
        throw error;
      }
      res.json(rows);
    }
  );
}
