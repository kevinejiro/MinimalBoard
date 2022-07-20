import styles from "./Modal.module.css";
import { Backdrop } from "./Backdrop";
import CancelIcon from "../svgs/CancelIcon";
// import Cancel from "../assets/images/cancel.svg";

interface IProps {
  show: boolean;
  closeModal: () => void;
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

export const Modal: React.FC<IProps> = ({ show, closeModal, children }) => (
  <div>
    <Backdrop show={show} clicked={closeModal} />
    <div
      data-testid="modal"
      className={styles.Modal}
      style={show ? scaleUp.styles : scaleDown.styles}
    >
      <div>
        <div>{children}</div>
        <div
          className={styles.ModalBtn}
          onClick={closeModal}
          data-testid="cancelButton"
        >
          <CancelIcon />
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
