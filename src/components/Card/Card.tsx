import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Character } from '../../types/Character';
import './Card.scss';

type Props = {
  card: Character;
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Card: React.FC<Props> = ({ card }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="card">
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <h5>{card.name}</h5>
      <img alt={card.name} src={card.image} className="card-image" />
      <p>{`Gender: ${card.gender}`}</p>
      <p>{`Species: ${card.species}`}</p>
    </div>
  );
};
