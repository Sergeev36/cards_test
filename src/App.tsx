import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getData} from "./action";
import AnimalCard from "./components/Card";
import {animalsState} from "./reducers";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./App.module.css";


function App() {
  const dispatch = useDispatch();
  const animals = useSelector((state: animalsState) => state.animals);
  const isLoading = useSelector((state: animalsState) => state.isLoading);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);

  const changeDisplay = () => {
    setOnlyFavorites(!onlyFavorites);
    setTimeout(() => setVisible(!visible), 500);
  };

  useEffect(() => {
    const apiUrl = "https://zoo-animal-api.herokuapp.com/animals/rand/10";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getData(data));
      })
  }, [dispatch]);

  const deleteCard = (id: number) => {
    const array = animals.filter((n) => n.id !== id);
    dispatch(getData(array));
  };

  if (isLoading) {
    return <div className={styles.load}>
      <CircularProgress/>
    </div>
  }
  return (
    <div>
      <div className={styles.buttonContainer}>
        <Button onClick={() => changeDisplay()}
                variant={onlyFavorites ? "contained" : "outlined"}
                size="medium">
          {onlyFavorites ? "All" : "Only Favorites"}
        </Button>
      </div>
      <div className={styles.App}>
        {animals.map((animal) => {
          return <AnimalCard
            animal={animal}
            key={animal.id}
            onlyFavorites={onlyFavorites}
            deleteCard={deleteCard}
            visible={visible}
          />
        })}
      </div>
    </div>
  );
}

export default App;
