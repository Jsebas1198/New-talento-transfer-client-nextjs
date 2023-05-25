'use client';
import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { IProps } from './IProps';
import UserService from '../../services/UserService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const UserCards = ({ id, photo, name, lastName, email, phone, age }: IProps) => {
  const router = useRouter();

  /**
   * @description Elimina un usuario
   */
  const goToEdit = () => {
    router.push(`/users/${id}`);
  };

  /**
   * @description Elimina un usuario
   */
  const deleteUser = () => {
    if (id) {
      UserService.deleteUser(id)
        .then(() => {
          toast('Usuario eliminado exitosamente', { type: 'success' });
          router.reload();
        })
        .catch((err) => {
          console.log('[DELETE PRODUCT ERROR]: ', err);
          toast('Error inesperado, intente más tarde', { type: 'error' });
        });
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={photo} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name + ' ' + lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {age}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Typography color="blue" onClick={goToEdit}>
            Edit
          </Typography>
        </Button>
        <Button size="small" onClick={deleteUser}>
          <Typography color="red">Delete</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCards;
