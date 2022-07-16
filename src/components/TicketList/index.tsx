import React from "react";
import { Droppable } from "react-beautiful-dnd";

// components
import TodoItem from "../TicketItem";
import InputField from "../InputField";

// style
import styles from "./TicketList.module.css";

// interface
import { Ticket, Status } from "../../models/ticket";

interface IProps {
  inTodosTickets: Ticket[];
  inProgressTickets: Ticket[];
  completedTickets: Ticket[];
  handleAdd: (task: string, status: Status) => void;
}

const TicketList: React.FC<IProps> = ({
  inTodosTickets,
  inProgressTickets,
  completedTickets,
  handleAdd,
}: IProps) => {
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
                {inTodosTickets.length === 0 ? (
                  <p className={styles.placeholder}>There are no tasks yet</p>
                ) : (
                  inTodosTickets.map((ticket, index) => (
                    <TodoItem index={index} ticket={ticket} key={ticket.id} />
                  ))
                )}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
        <InputField handleAdd={(task) => handleAdd(task, "todo")} />
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
                {inProgressTickets.length === 0 ? (
                  <p className={styles.placeholder}>There are no tasks yet</p>
                ) : (
                  inProgressTickets.map((ticket, index) => (
                    <TodoItem index={index} ticket={ticket} key={ticket.id} />
                  ))
                )}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
        <InputField handleAdd={(task) => handleAdd(task, "inprogress")} />
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
                {completedTickets.length === 0 ? (
                  <p className={styles.placeholder}>There are no tasks yet</p>
                ) : (
                  completedTickets.map((ticket, index) => (
                    <TodoItem index={index} ticket={ticket} key={ticket.id} />
                  ))
                )}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
        <InputField handleAdd={(task) => handleAdd(task, "completed")} />
      </div>
    </section>
  );
};

export default TicketList;
