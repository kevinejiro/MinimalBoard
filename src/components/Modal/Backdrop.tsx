import React from "react";
import styles from "./Modal.module.css";

interface IProps {
  show: boolean;
  clicked: () => void;
}

export const Backdrop: React.FC<IProps> = ({ show, clicked }) =>
  show ? <div className={styles.Backdrop} onClick={clicked}></div> : null;
