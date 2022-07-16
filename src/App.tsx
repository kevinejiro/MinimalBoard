import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
// components
import TicketList from "./components/TicketList";
// interface
import { Ticket } from "./models/ticket";
// css
import styles from "./App.module.css";

const App: React.FC = () => {
  const [inTodosTickets, setInTodosTickets] = useState<Ticket[]>([]);
  const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>([]);
  const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);

  const handleAdd = (
    task: string,
    status: "todo" | "inprogress" | "completed"
  ) => {
    // console.log("task :", task, status);
    switch (status) {
      case "inprogress":
        setInProgressTickets([
          ...inProgressTickets,
          { id: nanoid(), task, status },
        ]);
        break;
      case "completed":
        setCompletedTickets([
          ...completedTickets,
          { id: nanoid(), task, status },
        ]);
        break;

      default:
        setInTodosTickets([...inTodosTickets, { id: nanoid(), task, status }]);
        break;
    }
  };

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
    setInProgressTickets(inprogress);
    setCompletedTickets(completed);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.App}>
        <div className={styles.Appinner}>
          <header>
            <h1>Minimal Kanban Board</h1>
          </header>
          <TicketList
            inTodosTickets={inTodosTickets}
            handleAdd={handleAdd}
            inProgressTickets={inProgressTickets}
            completedTickets={completedTickets}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
