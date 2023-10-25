import { PropsWithChildren, createContext, useCallback, useState } from 'react';

export const DrawerContext = createContext({
  isShowing: false,
  toggle: () => {},
});

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = useCallback(() => {
    setIsShowing((prev) => !prev);
  }, []);

  return (
    <DrawerContext.Provider value={{ isShowing, toggle }}>
      {children}
    </DrawerContext.Provider>
  );
};
