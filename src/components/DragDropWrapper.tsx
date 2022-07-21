import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// components
import TicketList from "./TicketList";
import ErrorBoundary from "./ErrorBoundary";
import Loader from "./Loader";

// css
import styles from "../App.module.css";

interface IProps {
  onDragEnd: (result: DropResult) => void;
  isLoading: boolean;
}

const DragDropWrapper: React.FC<IProps> = ({ onDragEnd, isLoading }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.App}>
        <div className={styles.Appinner}>
          <header>
            <h1>Minimal Kanban Board</h1>
          </header>
          <ErrorBoundary fallback="Sorry.. there was an error">
            {isLoading ? <Loader /> : <TicketList />}
          </ErrorBoundary>
        </div>
      </div>
    </DragDropContext>
  );
};

export default DragDropWrapper;
