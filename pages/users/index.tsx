'use client';
import UserCards from '../../src/components/UserCards';
import MUser from '../../src//models/MUser';
import UserService from '../../src//services/UserService';
import { parseObjectsProps } from '../../src//utils/parse';
import { Box, Grid } from '@mui/material';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

export const getServerSideProps: GetServerSideProps<{ users: any }> = async () => {
  let usersResponse: MUser[];
  console.log('entra');

  try {
    usersResponse = await UserService.getUsers();
    return {
      props: {
        users: parseObjectsProps(usersResponse),
      },
    };
  } catch (error) {
    console.log('getServerSideProps ERROR: ', error);
    return {
      props: {
        users: [],
      },
    };
  }
};

const ShowAllUsers = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const usersResponse = await UserService.getUsers();
  return (
    <Box>
      <Grid container spacing={2}>
        {users.map((user: MUser) => (
          <UserCards
            name={user.name}
            lastName={user.lastName}
            email={user.email}
            phone={user.phone}
            age={0}
            photo={user.photo}
            key={user.name}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ShowAllUsers;
