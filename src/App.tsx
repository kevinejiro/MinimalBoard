import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
// components
import TicketList from "./components/TicketList";
import ErrorBoundary from "./components/ErrorBoundary";
// interface
import { Ticket, Status } from "./models/ticket";
// css
import styles from "./App.module.css";

const App: React.FC = () => {
  const [inTodosTickets, setInTodosTickets] = useState<Ticket[]>([]);
  const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>([]);
  const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);

  // console.log("todo tickets :", inTodosTickets);
  // console.log("inProgressTickets :", inProgressTickets);
  // console.log("completedTickets :", completedTickets);

  useEffect(() => {
    const getTickets = async () => {
      const ticketsFromServer = await fetchAllTasks();
      // console.log("tickets :", ticketsFromServer);
      let todos = ticketsFromServer[0]?.todo;
      let inprogress = ticketsFromServer[1]?.inprogress;
      let completed = ticketsFromServer[2]?.completed;
      setInTodosTickets(todos);
      setInProgressTickets(inprogress);
      setCompletedTickets(completed);
    };

    getTickets();
  }, []);

  // Update Ticket
  const updateTicket = async (tickets: Ticket[], status: Status) => {
    let index;
    let postObject;
    if (status === "inprogress") {
      index = 2;
      postObject = { id: index, name: status, inprogress: tickets };
    } else if (status === "completed") {
      index = 3;
      postObject = { id: index, name: status, completed: tickets };
    } else if (status === "todo") {
      index = 1;
      postObject = { id: index, name: status, todo: tickets };
    }

    const res = await fetch(`http://localhost:5000/tasks/${index}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(postObject),
    });

    const data = await res.json();
    console.log("data :", data);
  };

  // Fetch all tickets
  const fetchAllTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await res.json();
    return data;
  };

  // const fetchSingleTicket = async (id: string, status: Status) => {
  //   const res = await fetch(`http://localhost:5000/tasks/1${status}/${id}`);
  //   const data = await res.json();
  //   return data;
  // };

  // handles adding tasks to corresponding column given a status
  const handleAdd = (task: string, status: Status) => {
    switch (status) {
      case "inprogress":
        let ipTickets = [...inProgressTickets, { id: nanoid(), task, status }];
        setInProgressTickets(ipTickets);
        updateTicket(ipTickets, status);
        break;
      case "completed":
        let cTickets = [...inProgressTickets, { id: nanoid(), task, status }];
        setCompletedTickets(cTickets);
        updateTicket(cTickets, status);
        break;

      default:
        let todoTickets = [...inTodosTickets, { id: nanoid(), task, status }];
        setInTodosTickets(todoTickets);
        updateTicket(todoTickets, status);
        break;
    }
  };

  // handles drag end logic
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    let add: Ticket;
    let todos = inTodosTickets;
    let inprogress = inProgressTickets;
    let completed = completedTickets;

    if (source.droppableId === "todo-column") {
      add = todos[source.index];
      todos.splice(source.index, 1);
    } else if (source.droppableId === "inprogress-column") {
      add = inprogress[source.index];
      inprogress.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "todo-column") {
      todos.splice(destination.index, 0, { ...add, status: "todo" });
    } else if (destination.droppableId === "inprogress-column") {
      inprogress.splice(destination.index, 0, { ...add, status: "inprogress" });
    } else {
      completed.splice(destination.index, 0, { ...add, status: "completed" });
    }

    setInTodosTickets(todos);
    updateTicket(todos, "todo");
    setInProgressTickets(inprogress);
    updateTicket(inprogress, "inprogress");
    setCompletedTickets(completed);
    updateTicket(completed, "completed");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.App}>
        <div className={styles.Appinner}>
          <header>
            <h1>Minimal Kanban Board</h1>
          </header>
          <ErrorBoundary fallback="Sorry.. there was an error">
            <TicketList
              inTodosTickets={inTodosTickets}
              handleAdd={handleAdd}
              inProgressTickets={inProgressTickets}
              completedTickets={completedTickets}
            />
          </ErrorBoundary>
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
