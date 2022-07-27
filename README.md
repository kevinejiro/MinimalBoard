# Minimal Kanban board.

Task:

- be able to create tickets on the board.
- be able to move tickets between the various columns in an interactive way, persisting across page refreshes.
- be able to share a direct link to the ticket.

# Kanban board

This Minimal Kanban board is built with React and TypeScript.

<img width="1440" alt="Screenshot 2022-07-20 at 8 35 41 PM" src="https://user-images.githubusercontent.com/28443813/180068353-15146f7d-7e7c-4e95-8033-5ecd4872aaf3.png">

## Features

1. Add a new ticket.

2. Drag and drop tickets.

3. The tickets are persisted in the JSON Server db on port 4000.

4. View single ticket by clicking.

## Available Scripts

In the project directory, you can run:

- Before running the app, please install all the dependencies by running `yarn install`

- `start:server` to run the Json Server [http://localhost:5000](http://localhost:4000).

- `yarn start` to run the app in the development mode on [http://localhost:3000](http://localhost:3000).

- `yarn build` to build the app for production in the `build` folder.

## Improvements

- Abstract logic to a decoupled backend.
- Add more test (figure out why React dnd fails to get id from prop while testing)
