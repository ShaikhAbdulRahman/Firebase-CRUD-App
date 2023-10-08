import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Model = ({ isOpen, onClose,children }) => {
  return createPortal (
    <>
      {isOpen && (
        <div className="backdrop-blur grid place-items-center h-screen w-screen absolute top-0 z-80">
          <div className="m-auto z-50 relative min-h-[200px] min-w-[80%] bg-white p-4">
            <div className=" flex justify-end">
              <AiOutlineClose onClick={onClose} className="text-2xl" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Model;
