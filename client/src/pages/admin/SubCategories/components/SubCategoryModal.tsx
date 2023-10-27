"use client";

import { PropsWithChildren, useCallback, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../../../components/ui";
import { MdClose } from "react-icons/md";
import { CSSTransition, Transition } from "react-transition-group";

const animationTiming = {
  enter: 400,
  exit: 100,
};

type Props = {
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  onClose: () => void;
  onSubmit?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

const SubCategoryModal = ({
  children,
  isOpen,
  disabled,
  title,
  body,
  footer,
  actionLabel,
  onClose,
  onSubmit,
  secondaryActionLabel,
  onSecondaryAction,
}: PropsWithChildren<Props>) => {
  const closeHandler = useCallback(() => {
    if (disabled) {
      return;
    }

    setTimeout(() => {
      onClose();
    }, 500);
  }, [disabled, onClose]);

  const submitHandler = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit && onSubmit();
  }, [disabled, onSubmit]);

  const secondaryActionHandler = useCallback(() => {
    if (disabled || !onSecondaryAction) {
      return;
    }

    onSecondaryAction();
  }, [disabled, onSecondaryAction]);

  return (
    <Transition
      onEnter={() => console.log("Enter")}
      onEntering={() => console.log("Entering")}
      onEntered={() => console.log("Entered")}
      onExit={() => console.log("Exit")}
      onExiting={() => console.log("Exiting")}
      onExited={() => console.log("Exited")}
      addEndListener={(node, done) => {
        // use the css transitionend event to mark the finish of a transition
        node.addEventListener("transitionend", done, false);
      }}
      in={isOpen}
      timeout={animationTiming}
      // timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {(state: any) => (
        <div className="fixed z-50 right-0 left-0 top-0 bottom-0 w-full h-screen overflow-x-hidden overflow-y-auto flex justify-center items-center bg-black/60 outline-none">
          <CSSTransition
            addEndListener={(node, done) => {
              // use the css transitionend event to mark the finish of a transition
              node.addEventListener("transitionend", done, false);
            }}
            in={isOpen}
            timeout={animationTiming}
            classNames={{
              enterActive: "-translate-y-1/4 opacity-100",
              exitActive: "translate-y-full opacity-0",
            }}
            mountOnEnter
            unmountOnExit
          >
            <div className="rounded-md shadow-lg overflow-hidden bg-white w-[32rem]">
              {/* Modal header */}
              <div className="flex justify-between items-center p-4 border-b border-slate-200">
                <h5 className="text-xl font-medium leading-normal">{title}</h5>
                <MdClose
                  className="cursor-pointer"
                  size={20}
                  onClick={onClose}
                />
              </div>

              {/* Modal body */}
              <div className="relative flex-auto p-4">{children}</div>

              {/* Modal footer */}
              {onSubmit && (
                <div className="flex flex-shrink-0 flex-wrap justify-end items-center gap-2 p-4">
                  <Button label="Cancel" />
                  <Button label="Save" />
                </div>
              )}
            </div>
          </CSSTransition>
        </div>
      )}
    </Transition>
  );

  // (
  //   <Transition
  //     onEnter={() => console.log("Enter")}
  //     onEntering={() => console.log("Entering")}
  //     onEntered={() => console.log("Entered")}
  //     onExit={() => console.log("Exit")}
  //     onExiting={() => console.log("Exiting")}
  //     onExited={() => console.log("Exited")}
  //     addEndListener={(node, done) => {
  //       // use the css transitionend event to mark the finish of a transition
  //       node.addEventListener("transitionend", done, false);
  //     }}
  //     in={isOpen}
  //     timeout={animationTiming}
  //     // timeout={300}
  //     mountOnEnter
  //     unmountOnExit
  //   >
  //     {(state: any) => (
  //       <div className="fixed z-50 right-0 left-0 top-0 bottom-0 w-full h-screen overflow-x-hidden overflow-y-auto flex justify-center items-center bg-black/60 outline-none">
  //         <div className="rounded-md shadow-lg overflow-hidden bg-white w-[32rem] -translate-y-1/4">
  //           {/* Modal header */}
  //           <div className="flex justify-between items-center p-4 border-b border-slate-200">
  //             <h5 className="text-xl font-medium leading-normal">{title}</h5>
  //             <MdClose className="cursor-pointer" size={20} onClick={onClose} />
  //           </div>

  //           {/* Modal body */}
  //           <div className="relative flex-auto p-4">{children}</div>

  //           {/* Modal footer */}
  //           {onSubmit && (
  //             <div className="flex flex-shrink-0 flex-wrap justify-end items-center gap-2 p-4">
  //               <Button label="Cancel" />
  //               <Button label="Save" />
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </Transition>
  // );

  // return (
  //   <>
  //     <div className="fixed z-50 flex justify-center items-center bg-neutral-800/70 inset-0 outline-none focus:outline-none overflow-x-hidden overflow-y-auto">
  //       <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full lg:h-auto md:h-auto mx-auto my-6">
  //         {/* CONTENT */}
  //         <div
  //           className={`h-full translate duration-300
  //           ${isShowing ? "translate-y-0" : "translate-y-full"}
  //           ${isShowing ? "opacity-100" : "opacity-0"}`}
  //         >
  //           <div className="relative bg-white w-full h-full lg:h-auto md:h-auto flex flex-col rounded-lg shadow-lg border-0 outline-none focus:outline-none translate">
  //             {/* HEADER */}
  //             <div className="relative flex justify-center items-center rounded-t p-4 border-b-[1px]">
  //               <button
  //                 className="absolute p-1 border-0 transition left-9 hover:opacity-70"
  //                 onClick={closeHandler}
  //               >
  //                 <IoMdClose size={18} />
  //               </button>
  //               <div className="text-lg font-semibold">{title}</div>
  //             </div>
  //             {/* BODY */}
  //             <div className="relative p-6 flex-auto">{body}</div>
  //             {/* FOOTER */}
  //             <div className="flex flex-col gap-2 p-6">
  //               <div className="flex flex-row items-center gap-4 w-full">
  //                 {secondaryActionLabel && (
  //                   <Button
  //                     label={secondaryActionLabel}
  //                     outlined
  //                     onClick={secondaryActionHandler}
  //                     disabled={disabled}
  //                   />
  //                 )}
  //                 <Button
  //                   label={actionLabel}
  //                   onClick={submitHandler}
  //                   disabled={disabled}
  //                 />
  //               </div>
  //               {footer}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default SubCategoryModal;
