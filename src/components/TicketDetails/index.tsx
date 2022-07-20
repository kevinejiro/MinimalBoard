import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// svg components
import CompletedIcon from "../svgs/CompletedIcon";
import InProgressIcon from "../svgs/InProgressIcon";
import TodoIcon from "../svgs/TodoIcon";

// interface
import { Ticket } from "../../models/ticket";

// style
import styles from "./TicketDetails.module.css";

// Api
import { fetchSingleTicket } from "../../api";

const TicketDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const location = useLocation();
  const state = location.state as Ticket;
  const ticketFromRouter = state;

  // grab params from url
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  const taskId = query.get("taskId");
  let status = query.get("status");

  // get all tickets on first load and page refresh
  useEffect(() => {
    if (ticketFromRouter?.id) {
      setTicket(ticketFromRouter);
    } else {
      if (taskId && status) {
        const getTicket = async () => {
          setIsLoading(true);
          let url = `http://localhost:4000/${status}`;
          try {
            const ticketFromServer = await fetchSingleTicket(url);
            let task = ticketFromServer.tasks.find(
              (x: { id: string }) => x.id === taskId
            );
            if (task) {
              setTicket(task);
            }
          } finally {
            setIsLoading(false);
          }
        };
        getTicket();
      }
    }
  }, [status, taskId, ticketFromRouter]);

  let ticketIcon;
  switch (status) {
    case "todo":
      ticketIcon = <TodoIcon />;
      break;
    case "inprogress":
      ticketIcon = <InProgressIcon />;
      break;
    case "completed":
      ticketIcon = <CompletedIcon />;
      break;
  }

  return (
    <>
      {isLoading ? (
        <div className="loaderWrapper">
          <div className="loading"></div>
        </div>
      ) : ticket ? (
        <div key={ticket?.id}>
          <h2>Task</h2>
          <div className={styles.detailsBody}>
            <span>{ticket?.task}</span>
            <div className={styles.detailsStatus}>
              <h3>Status :</h3>
              <span>
                {ticketIcon} {ticket?.status}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <h1>No task with that ID</h1>
      )}
    </>
  );
};

export default TicketDetails;
