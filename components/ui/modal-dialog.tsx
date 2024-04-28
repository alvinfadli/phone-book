import React, { useRef, useEffect } from "react";

type Props = {
  title: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
};

export default function Dialog({ title, onClose, onOk, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (dialogElement) {
      dialogElement.showModal();
    }

    return () => {
      if (dialogElement) {
        dialogElement.close();
      }
    };
  }, []);

  const closeDialog = () => {
    onClose();
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  return (
    <dialog ref={dialogRef} className="bg-transparent">
      <div className="relative bg-transparent mx-auto max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-md font-semibold text-gray-900 ">{title}</h3>
            <button
              onClick={closeDialog}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 ">
              {children}
            </p>
          </div>
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b gap-1 ">
            <button
              onClick={closeDialog}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-slate-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
            >
              Cancel
            </button>
            <button
              onClick={clickOk}
              type="button"
              className="text-white bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
