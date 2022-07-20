# Technical assignment front-end engineer

Minimal Kanban board.

Task:

- be able to create tickets on the board.
- be able to move tickets between the various columns in an interactive way, persisting across page refreshes.
- be able to share a direct link to the ticket.

**Minimal requirements**

The three pillars of front-end development are HTML, CSS and JavaScript. We would like to see you know how to use them for the right job.

- Use React
- Pay attention to semantics: any HTML might work, but choosing the right tags show you care.
- Show us you know how to create a modern user interface using your favourite styling solution.
- Interact with an API. [JSON Server](https://github.com/typicode/json-server) can be used to add a fake REST API or you can decide to build your own.

# Kanban board

This Minimal Kanban board is built with React and TypeScript.

![Screenshot](screenshot.png)

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
