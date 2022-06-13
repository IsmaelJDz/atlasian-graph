import { MainState } from "./";
import { PropsResponse } from "@/interfaces/index";

type MainActionType = {
  type: "Data - Set ResponseData";
  payload: PropsResponse;
};

export const mainReducer = (
  state: MainState,
  action: MainActionType
): MainState => {
  switch (action.type) {
    case "Data - Set ResponseData":
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
