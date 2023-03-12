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
  
  let { users, noteType=1, title, body, sentBy } = req.body;

  // validate the body schema before processing
  if(users?.length<1)res.status(500).json({error:`select the users to send the note`})
  else if(!title || title.trim()==="")res.status(500).json({error:`the title is required`})
  else if(!body || body.trim()==="")res.status(500).json({error:`cannot send an empty note`})
  else{
    users.map((user: User) => {
      if(!user.id)return;
      
      db.run(`
      INSERT INTO notes(title, body, note_type, sent_by) 
      VALUES ("${title}", "${body}"), "${noteType}", "${user.id}"`);
    });
  
    // todo: confirm that all insertions are successful
    res.json({status:"ok"})
  }

  
}
