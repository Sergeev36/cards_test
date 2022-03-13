import {dataAction} from "../action";

export interface IAnimal {
  id: number,
  image_link: string,
  name: string,
  animal_type: string,
  geo_range: string,
  habitat: string,
  lifespan: string
}

export interface animalsState {
  animals: IAnimal[],
  isLoading: boolean,
}

const initialState: animalsState = {
  animals: [{
    id: 0,
    image_link: "",
    name: "",
    animal_type: "",
    geo_range: "",
    habitat: "",
    lifespan: ""
  }],
  isLoading: true
}

const reducer = (state: animalsState = initialState, action: dataAction): animalsState => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        animals: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}

export default reducer;

