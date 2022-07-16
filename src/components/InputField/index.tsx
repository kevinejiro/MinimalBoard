import React, { useState } from "react";
import styles from "./InputField.module.css";

interface IProps {
  handleAdd: (task: string) => void;
}

const InputField: React.FC<IProps> = ({ handleAdd }) => {
  const [Task, setTask] = useState("");
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);

  const handleAddTask = () => {
    let todo = Task.trim();
    if (Task !== "") {
      handleAdd(todo);
      setTask("");
    }
    setIsAddingNewTask(false);
  };

  return (
    <div className={styles.inputContainer}>
      {isAddingNewTask ? (
        <input
          className={styles.formInput}
          autoFocus
          name="addTask"
          type="text"
          placeholder="Add a task"
          value={Task}
          onBlur={handleAddTask}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
              handleAddTask();
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />
      ) : (
        <button
          className={styles.addButton}
          onClick={() => setIsAddingNewTask(true)}
        >
          + New Task
        </button>
      )}
    </div>
  );
};

export default React.memo(InputField);