import { Request, Response } from "express";
import db from "~database";


export class User {
  id: number;
  name: string;
  picture: string;
}

/**
 * sends a note to one or multiple users with specific type
 */
export default function (req: Request, res: Response) {
  let { users, type = 1, title, body, sentBy } = req.body;

  // validate the body schema before processing
  // todo: validate that all users and sentBy are exists in the database
  if (users?.length < 1)
    res.status(500).json({ error: `select the users to send the note` });
  else if (!title || title.trim() === "")
    res.status(500).json({ error: `the title is required` });
  else if (!body || body.trim() === "")
    res.status(500).json({ error: `cannot send an empty note` });
  else {
    let values = users.map( 
      (user: string | number) =>
        `("${user}", "${title}", "${body}", "${type}", "${sentBy}")`
    );

    // todo: use placeholders
    db.run(
      `INSERT INTO notes(user, title, body, note_type, sent_by) VALUES ${values.join(
        ","
      )}`,
      function (error: Error) {
        if (error) {
          console.log({ error });
          res.status(500).json({ error });
          // todo: close the connection after finishing
          // db.close();
          throw error;
        }
        // @ts-ignore
        res.json({ status: "ok", ...this });
        // db.close();
      }
    );
  }
}
