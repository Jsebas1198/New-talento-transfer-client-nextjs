'use client';
import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { IProps } from './IProps';

const UserCards = ({ photo, name, lastName, email, phone, age }: IProps) => {
  // Assuming you have an array of card data

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
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default UserCards;
