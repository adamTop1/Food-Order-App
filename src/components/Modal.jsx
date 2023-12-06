import { Fragment } from "react"
import { createPortal  } from "react-dom"

const Backdrop = ({onClose}) => {
    return <div className="fixed top-0 left-0 w-full h-screen z-20 backdrop-brightness-50 " onClick={onClose} />
  }
  
  const ModalOverlay = (props) => {
    return <div className=" fixed w-10/12 sm:w-5/12 xl:w-4/12 bg-white p-4 rounded shadow-lg z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div>{props.children}</div>
    </div>
  }

  const portalElement = document.getElementById('modal')



function Modal(props) {
    return <Fragment>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  }

export default Modal