import React from "react";
import styles from "./TicketItem.module.css";

import { Ticket } from "../../models/ticket";
import { Draggable } from "react-beautiful-dnd";

interface IProps {
  index: number;
  ticket: Ticket;
}

const TicketItem: React.FC<IProps> = ({ index, ticket }) => {
  const handleClickToViewTicket = () => {
    return;
  };

  return (
    <Draggable draggableId={ticket.id.toString()} index={index}>
      {(provided, snapshot) => (
        <li
          className={styles.todoItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            ...provided.draggableProps.style,
            background: snapshot.isDragging
              ? "rgba(245,245,245, 0.75)"
              : "none",
          }}
        >
          <div className={styles.todoDragableItem}>X</div>
          <span
            className={
              ticket?.status === "completed"
                ? styles.completed
                : styles.ticketText
            }
            onClick={handleClickToViewTicket}
          >
            {ticket.task}
          </span>
        </li>
      )}
    </Draggable>
  );
};

export default React.memo(TicketItem);
