const Modal = (props) => {
  return (
    <div>
      <div className="backdrop" onClick={props.onClick}></div>
      <div className="modal">
        <p>Are you sure?</p>
        <p>This is irreversable!</p>
        <button onClick={props.onCancel}>Cancel</button>
        <button onClick={props.onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Modal;
