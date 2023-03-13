# the note app

## test
run `npm t` to run all test cases.
inspect the file `src/app.spec.ts` to deeply understand the business logic.

## features
- integrated unit testing
- api versioning
- authorization


## endpoints
- sending a note
make a POST request to `/send` by an authorized user containing the target users and the note
each note contains a title, body and a type

- list all notes
make a GET request to `/list/all` by an authorized user.

- list own users
each user can list his own notes by issuing a GET request to `/list`

## todo:
- add an upload middleware such as [multer](https://www.npmjs.com/package/multer) to accept `multipart/form-data` and upload the incoming media files.
- setup a notification system (such as firebase messaging) 
to send a notification to the target users after sending the note.
- filter the notes by `disabled`,  `time` and one or more types
- enable paginating
- an endpoint to issue a soft delete
- cron job to daily send notifications to users that activated this feature
- check all inline `todo:` that included inside the codebase

