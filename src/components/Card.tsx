import React, {useState} from 'react';
import {IAnimal} from "../reducers";
import {Animated} from "react-animated-css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./Card.module.css";


type Props = {
  animal: IAnimal,
  onlyFavorites: boolean,
  deleteCard: (id: number) => void,
  visible: boolean
}

const AnimalCard = ({animal, onlyFavorites, deleteCard, visible}: Props) => {
  const [like, setLike] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onLoad = () => {
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <Animated animationIn="bounceInLeft"
              animationOut="fadeOut"
              isVisible={!(onlyFavorites && !like)}
              style={{display: !visible && onlyFavorites && !like ? "none" : "inline"}}
    >
      <Card sx={{maxWidth: 420}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="180"
            image="https://thumbs.gfycat.com/BlankHardChicken-size_restricted.gif"
            style={{display: isLoading ? "block" : "none"}}
          />
          <CardMedia
            component="img"
            height="180"
            image={animal.image_link}
            style={{display: isLoading ? "none" : "block"}}
            onLoad={onLoad}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {animal.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type: {animal.animal_type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {animal.geo_range}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Habitat: {animal.habitat}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lifespan: {animal.lifespan}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={styles.footer}>
          <IconButton style={{color: like ? "red" : "grey"}}
                      onClick={() => setLike(!like)}
                      aria-label="add to favorites">
            <FavoriteIcon/>
          </IconButton>
          <IconButton aria-label="delete" size="large"
                      onClick={() => deleteCard(animal.id)}>
            <DeleteIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Animated>
  );
};

export default AnimalCard;