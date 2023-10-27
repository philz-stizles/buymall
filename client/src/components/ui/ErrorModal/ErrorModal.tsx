import ReactDOM from "react-dom";
import classes from "./ErrorModal.module.css";
import Card from "../Card";
import Button from "../Button/Button";

type ModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
};

const ErrorModal = ({ title, message, onConfirm }: ModalProps) => {
  const Backdrop = ({ onConfirm }: { onConfirm: () => void }) => (
    <div className={classes.backdrop} onClick={onConfirm} />
  );

  const Modal = ({ title, message, onConfirm }: ModalProps) => (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        <p>{message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={onConfirm}>Okay</Button>
      </footer>
    </Card>
  );

  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop-root") as Element
      )}
      {ReactDOM.createPortal(
        <Modal title={title} message={message} onConfirm={onConfirm} />,
        document.getElementById("modal-root") as Element
      )}
      {/* {ReactDOM.createPortal(
        <React.Fragment>
          <Backdrop />
          <Modal
            title={props.title}
            message={props.message}
            onConfirm={props.onConfirm}
          />
        </React.Fragment>,
        document.getElementById("modal-root")
      )} */}
    </div>
  );
};

export default ErrorModal;
