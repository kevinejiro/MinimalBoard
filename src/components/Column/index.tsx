import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";

// components
import TodoItem from "../TicketItem";
import InputField from "../InputField";

// context
import { KanbanContext } from "../../App";

// interface
import { ITicketList } from "../../models/ticket";

// style
import styles from "../TicketList/TicketList.module.css";

const Column: React.FC<ITicketList> = ({ tickets, column }) => {
  const appContext = useContext(KanbanContext);

  let handleAdd = appContext?.handleAdd ?? null;
  return (
    <div className={styles.column}>
      <h2>{column}</h2>
      <Droppable droppableId={`${column}-column`}>
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
              {tickets?.length === 0 ? (
                <p className={styles.placeholder}>There are no tasks yet</p>
              ) : (
                tickets?.map((ticket, index) => (
                  <TodoItem index={index} ticket={ticket} key={ticket?.id} />
                ))
              )}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
      <InputField handleAdd={(task) => handleAdd && handleAdd(task, column)} />
    </div>
  );
};

export default Column;
