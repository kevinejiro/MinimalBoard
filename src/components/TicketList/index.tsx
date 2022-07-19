import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";

// components
import TodoItem from "../TicketItem";
import InputField from "../InputField";

// style
import styles from "./TicketList.module.css";

// context
import { KanbanContext } from "../../App";

const TicketList: React.FC = () => {
  const appContext = useContext(KanbanContext);
  let inTodosTickets = appContext?.inTodosTickets ?? [];
  let inProgressTickets = appContext?.inProgressTickets ?? [];
  let completedTickets = appContext?.completedTickets ?? [];
  let handleAdd = appContext?.handleAdd ?? null;

  return (
    <section className={styles.ticketListContainer}>
      <div className={styles.column}>
        <h2>Todos</h2>
        <Droppable droppableId="todo-column">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                background: snapshot.isDraggingOver
                  ? "rgba(245,245,245, 0.2)"
                  : "none",
              }}
            >
              <ul className={styles.ticketList}>
                {inTodosTickets?.length === 0 ? (
                  <p className={styles.placeholder}>There are no tasks yet</p>
                ) : (
                  inTodosTickets?.map((ticket, index) => (
                    <TodoItem index={index} ticket={ticket} key={ticket?.id} />
                  ))
                )}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
        <InputField
          handleAdd={(task) => handleAdd && handleAdd(task, "todo")}
        />
      </div>
      <div className={styles.column}>
        <h2>In Progress</h2>
        <Droppable droppableId="inprogress-column">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                background: snapshot.isDraggingOver
                  ? "rgba(245,245,245, 0.2)"
                  : "none",
              }}
            >
              <ul className={styles.ticketList}>
                {inProgressTickets?.length === 0 ? (
                  <p className={styles.placeholder}>There are no tasks yet</p>
                ) : (
                  inProgressTickets?.map((ticket, index) => (
                    <TodoItem index={index} ticket={ticket} key={ticket?.id} />
                  ))
                )}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
        <InputField
          handleAdd={(task) => handleAdd && handleAdd(task, "inprogress")}
        />
      </div>
      <div className={styles.column}>
        <h2>Completed</h2>
        <Droppable droppableId="completed-column">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                background: snapshot.isDraggingOver
                  ? "rgba(245,245,245, 0.2)"
                  : "none",
              }}
            >
              <ul className={styles.ticketList}>
                {completedTickets?.length === 0 ? (
                  <p className={styles.placeholder}>There are no tasks yet</p>
                ) : (
                  completedTickets?.map((ticket, index) => (
                    <TodoItem index={index} ticket={ticket} key={ticket?.id} />
                  ))
                )}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
        <InputField
          handleAdd={(task) => handleAdd && handleAdd(task, "completed")}
        />
      </div>
    </section>
  );
};

export default TicketList;
