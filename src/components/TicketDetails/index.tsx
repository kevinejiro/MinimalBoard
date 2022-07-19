import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// interface
import { Ticket } from "../../models/ticket";

// Api
import { fetchSingleTicket } from "../../api";

const TaskDetails: React.FC = () => {
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

  console.log("ticketFromRouter :", ticketFromRouter);

  // get all tickets on first load and page refresh
  useEffect(() => {
    if (ticketFromRouter?.id) {
      setTicket(ticketFromRouter);
    } else {
      if (taskId && status) {
        const getTicket = async () => {
          setIsLoading(true);
          let url = `http://localhost:5000/${status}`;
          try {
            const ticketFromServer = await fetchSingleTicket(url);
            let task = ticketFromServer.tasks.find(
              (x: { id: string }) => x.id === taskId
            );
            if (task) {
              setTicket(task);
            }
          } catch (error) {
            console.log("error from app", error);
          } finally {
            setIsLoading(false);
          }
        };
        getTicket();
      }
    }
  }, [status, taskId, ticketFromRouter]);

  return (
    <>
      {isLoading ? (
        <div className="loaderWrapper">
          <div className="loading"></div>
        </div>
      ) : ticket ? (
        <div key={ticket?.id}>
          <h1>Task</h1>
          <div>
            <h2>{ticket?.task}</h2>
            <div>{ticket?.status}</div>
          </div>
        </div>
      ) : (
        <h1>No task with that ID</h1>
      )}
    </>
  );
};

export default TaskDetails;