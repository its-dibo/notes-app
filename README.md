# the note app

## test
run `npm t` to run all test cases.
inspect the file `src/app.spec.ts` to deeply understand the business logic.

## features
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