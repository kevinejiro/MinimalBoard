import React, { useContext } from "react";

// components
import Column from "../Column";

// interface
import { ITicketList } from "../../models/ticket";

// style
import styles from "./TicketList.module.css";

// context
import { KanbanContext } from "../../App";

const TicketList: React.FC = () => {
  const appContext = useContext(KanbanContext);
  let inTodosTickets = appContext?.inTodosTickets ?? [];
  let inProgressTickets = appContext?.inProgressTickets ?? [];
  let completedTickets = appContext?.completedTickets ?? [];

  const ticketList: ITicketList[] = [
    { column: "todos", tickets: inTodosTickets },
    { column: "inprogress", tickets: inProgressTickets },
    { column: "completed", tickets: completedTickets },
  ];

  return (
    <section className={styles.ticketListContainer}>
      {ticketList.map((ticketsObject) => (
        <Column
          tickets={ticketsObject.tickets}
          column={ticketsObject.column}
          key={ticketsObject.column}
        />
      ))}
    </section>
  );
};

export default TicketList;
