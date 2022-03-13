import {IAnimal} from "../reducers";

export interface dataAction {
  type: "GET_DATA";
  payload: IAnimal[];
}

export const getData = (data: IAnimal[]) : dataAction => {
  return {type: "GET_DATA", payload: data}
}