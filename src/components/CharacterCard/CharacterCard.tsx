import {
  Backdrop,
  Card,
  Fade,
  Modal,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Character } from '../../types/Character';
import './CharacterCard.scss';

type Props = {
  card: Character;
};

export const CharacterCard: React.FC<Props> = ({ card }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Card onClick={handleOpen} className="card">
      <CardMedia
        component="img"
        height="140"
        image={card.image}
        alt={card.name}
      />
      <CardContent>
        <Typography id="modal-modal-title" variant="h6" component="h6">
          {card.name}
        </Typography>
        <Typography variant="body2">
          {`Gender: ${card.gender}`}
          <br />
          {`Species: ${card.species}`}
        </Typography>
      </CardContent>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card className="card-popups">
            <CardMedia
              component="img"
              height="140"
              image={card.image}
              alt={card.name}
            />
            <CardContent>
              <Typography id="modal-modal-title" variant="h6" component="h6">
                {card.name}
              </Typography>
              <Typography variant="body2">
                {`Gender: ${card.gender}`}
                <br />
                {`Species: ${card.species}`}
                <br />
                {`Status: ${card.status}`}
                <br />
                {`Origin: ${card.origin.name}`}
                <br />
                {`Type: ${card.type || 'none'}`}
                <br />
                {`Location: ${card.location.name}`}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </Card>
  );
};
