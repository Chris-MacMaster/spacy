import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => {
      setModalContent(null);
      if (typeof onModalClose === "function") {
        onModalClose();
      }
    }, 300);
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal, // function to close the modal
    open,
    setOpen, // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal, open } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal"
    // className="fixed flex justify-center items-center z-20 inset-0"
    >
      <div
        id="modal-background"
        onClick={closeModal}
        className={`fixed inset-0 flex justify-center items-center transition-colors z-30 duration-300
        ${open ? "visible bg-black/40" : "invisible"}
    `}
      />
      <div
        id="modal-content"
        className={`shadow p-6 transition-all duration-300 mx-4 absolute bg-white rounded-xl z-40
      ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      >
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
