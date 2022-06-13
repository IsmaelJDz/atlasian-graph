import { FC, useReducer } from "react";
import { MainContext } from "./";
import { mainReducer } from "./MainReducer";

import {
  PropsResponse,
  PriceEvolutionResponse,
  PresenceProductResponse,
  ComparativeTableProductResponse,
} from "@/interfaces/index";

export interface MainState {
  data: PropsResponse;
}

interface MainProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const UI_INITIAL_STATE: MainState = {
  data: {
    price: [],
    presence: [],
    products: [],
  },
};

export const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, UI_INITIAL_STATE);

  const setDataResponse = (apiData: PropsResponse) => {
    dispatch({ type: "Data - Set ResponseData", payload: apiData });
  };

  return (
    <MainContext.Provider
      value={{
        ...state,
        setDataResponse,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
