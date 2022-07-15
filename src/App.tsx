import React, { useState } from "react";

// interface
import { Ticket } from "./models/ticket";

// css
import styles from "./App.module.css";

const App: React.FC = () => {
  const [inTodosTickets, setInTodosTickets] = useState<Ticket[]>([]);
  const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>([]);
  const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);

  return (
    <div className={styles.App}>
      <section className={styles.Appinner}></section>
      <header>
        <h1>Minimal Kanban Board</h1>
      </header>
    </div>
  );
};

export default App;
