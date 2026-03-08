import { createContext, useState, type ReactNode } from "react";
import Loader from "../shared/components/global/Loader";

const LoaderContext = createContext<{
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  loading: false,
  setLoading: () => {},
});

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      <Loader></Loader>
    </LoaderContext.Provider>
  );
};

export default LoaderContext;
