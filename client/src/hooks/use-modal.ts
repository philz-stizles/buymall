import { useCallback, useState } from "react";

export const useModal = () => {
 const [modalIsShowing, setShowModal] = useState(false); // Type wil be inferred.

 const showModalHandler = useCallback(async () => {
   setShowModal(true);
 }, []);

 const hideModalHandler = useCallback(async () => {
   setShowModal(false);
 }, []);


    return { 
        modalIsShowing, 
        showModal: showModalHandler, 
        hideModal: hideModalHandler 
    };
};
