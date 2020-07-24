## Running the Project

- Install dependencies first by running `npm i` in your bash terminal
- Then start the project by running `npm run start`
  - this will build the project and serve it at `localhost:8080`
  - visit `localhost:8080` to see app
- Enter a username of your choice, there are no authentication pieces to this application, the userName is used for reservation feature only

### Features

- Application will retrieve all books, with pagination data default with limit=3.
- Clicking `My Reserved Books` will show you a list of books reserved under the userName you input at the start of the app.
- Search feature was implemented with some degree of fuzzy searching, and case insensitive. However, there are still corner cases of pagination needed if there are more than 3 search results returning. In the interest of time, I didn't get to make sure pagination for search results return correctly through link. But it is a circumstance I recognize that needs more time to develop to perfect this feature.
- Clicking on "bookmark" icon in the book list will be able to make a reservation on this book. Currently there are no feature to unreserve a book. Book reservation can only be made once.
