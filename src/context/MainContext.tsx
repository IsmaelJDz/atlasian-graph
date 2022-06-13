import { createContext } from "react";
import { PropsResponse } from "@/interfaces/index";

interface ContextProps {
  data: PropsResponse;
  setDataResponse: (apiData: PropsResponse) => void;
}

export const MainContext = createContext({} as ContextProps);
