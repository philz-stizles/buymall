import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

const ModalContext = createContext({
  isShowing: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isShowing, setIsShowing] = useState(false);

  const openHandler = useCallback(() => {
    setIsShowing(true);
  }, []);

  const closeHandler = useCallback(() => {
    setIsShowing(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isShowing,
        openModal: openHandler,
        closeModal: closeHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
