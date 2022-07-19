import React, { useState, useEffect, useCallback, createContext } from "react";
import { DropResult } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// components
import Modal from "./components/Modal/index";
import ErrorBoundary from "./components/ErrorBoundary";
import DragDropWrapper from "./components/DragDropWrapper";
import TicketDetails from "./components/TicketDetails";
// types
import { Ticket, Status } from "./models/ticket";
// Api
import { fetchAllTickets, updateTicket } from "./api";

interface ContextProps {
  inTodosTickets: Ticket[];
  inProgressTickets: Ticket[];
  completedTickets: Ticket[];
  isLoading: boolean;
  handleAdd: (task: string, status: Status) => void;
}

export const KanbanContext = createContext<ContextProps | null>(null);

const App: React.FC = () => {
  const [inTodosTickets, setInTodosTickets] = useState<Ticket[]>([]);
  const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>([]);
  const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);

  const navigate = useNavigate();

  const toggleCancelHandler = useCallback(() => {
    setViewModal(!viewModal);
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewModal]);

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const taskId = query.get("taskId");

  useEffect(() => {
    if (taskId) {
      setViewModal(true);
    }
  }, [taskId]);

  // get all tickets on first load and page refresh
  useEffect(() => {
    const getAllTickets = async () => {
      setIsLoading(true);
      let url = "http://localhost:4000/db";
      try {
        const ticketsFromServer = await fetchAllTickets(url);
        if (ticketsFromServer) {
          let todos = ticketsFromServer?.todo?.tasks;
          let inprogress = ticketsFromServer?.inprogress?.tasks;
          let completed = ticketsFromServer?.completed?.tasks;
          setInTodosTickets(todos);
          setInProgressTickets(inprogress);
          setCompletedTickets(completed);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getAllTickets();
  }, []);

  // handles adding tasks to corresponding column given a status
  const handleAdd = (task: string, status: Status) => {
    switch (status) {
      case "inprogress":
        let ipTickets = [...inProgressTickets, { id: nanoid(), task, status }];
        setInProgressTickets(ipTickets);
        updateTicket(ipTickets, status);
        break;
      case "completed":
        let cTickets = [...completedTickets, { id: nanoid(), task, status }];
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

  const value: ContextProps = {
    inTodosTickets,
    inProgressTickets,
    completedTickets,
    handleAdd,
    isLoading,
  };

  return (
    <KanbanContext.Provider value={value}>
      <DragDropWrapper onDragEnd={onDragEnd} isLoading={isLoading} />
      <Modal modalClosed={toggleCancelHandler} show={viewModal}>
        <ErrorBoundary fallback="Sorry.. there was an error">
          <TicketDetails />
        </ErrorBoundary>
      </Modal>
      <Toaster
        toastOptions={{
          error: {
            style: {
              color: "#000",
              border: "1px solid lightgrey",
              borderRadius: "4px",
            },
          },
        }}
      />
    </KanbanContext.Provider>
  );
};

export default App;
