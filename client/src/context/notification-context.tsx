import {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from "react";

export const NotificationContext = createContext({
  isShowing: false,
  toggle: () => {},
});

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = useCallback(() => {
    setIsShowing((prev) => !prev);
  }, []);

  return (
    <NotificationContext.Provider value={{ isShowing, toggle }}>
      {children}
    </NotificationContext.Provider>
  );
};
