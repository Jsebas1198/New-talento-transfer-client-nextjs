'use client';
import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Box, Grid } from '@mui/material';

import UserCards from '../../src/components/UserCards';
import CustomButton from '../../src/components/common/CustomButton';
import MUser from '../../src/models/MUser';
import UserService from '../../src/services/UserService';
import { parseObjectsProps } from '../../src/utils/parse';
import Link from 'next/link';
export const getServerSideProps: GetServerSideProps<{ users: any }> = async () => {
  let usersResponse: MUser[];

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
  return (
    <>
      <Box
        height={'100%'}
        width={'100%'}
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={2}
      >
        <Box width={'80%'} display="flex" justifyContent="center" alignItems="center">
          <Link href={`/`}>
            <CustomButton
              title={'Crear usuario'}
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Link>
        </Box>
      </Box>
      <Box
        height={'100%'}
        width={'100%'}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          height={'100%'}
          width={'80%'}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap={'wrap'}
        >
          <Grid container spacing={2} display="flex" justifyContent="space-between">
            {users.map((user: MUser) => (
              <Grid item key={user.name} xs={12} sm={6} md={4} lg={3}>
                <UserCards
                  id={user._id}
                  name={user.name}
                  lastName={user.lastName}
                  email={user.email}
                  phone={user.phone}
                  age={0}
                  photo={user.photo}
                  key={user.name}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ShowAllUsers;
