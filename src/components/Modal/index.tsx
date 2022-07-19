import styles from "./Modal.module.css";
import { Backdrop } from "./Backdrop";
import CancelIcon from "../svgs/CancelIcon";
// import Cancel from "../assets/images/cancel.svg";

interface IProps {
  show: boolean;
  modalClosed: () => void;
  children: React.ReactNode;
}

const scaleUp = {
  styles: {
    transform: "translate(-50%, -50%) scale(1)",
    opacity: "1",
  } as React.CSSProperties,
};

const scaleDown = {
  styles: {
    transform: "translate(0%, -100%) scale(0)",
    opacity: "0",
  } as React.CSSProperties,
};

export const Modal: React.FC<IProps> = ({ show, modalClosed, children }) => (
  <div>
    <Backdrop show={show} clicked={modalClosed} />
    <div
      className={styles.Modal}
      style={show ? scaleUp.styles : scaleDown.styles}
    >
      <div>
        <div>{children}</div>
        <div className={styles.ModalBtn} onClick={modalClosed}>
          <CancelIcon />
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
