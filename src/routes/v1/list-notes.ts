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
  let userId = req.auth.userId,
    allNotes = req.url.split("/")[2] === 'all',
    condition = !allNotes ? `where user=${userId}` : "";    

  // todo: filter notes and enable paginating
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
