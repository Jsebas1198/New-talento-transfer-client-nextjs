'use client';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ChangeEvent, useState } from 'react';

import CustomButton from '../CustomButton';
import { IProps } from './IProps';

const CustomForm = ({
  register,
  handleSubmit,
  handleImageChange,
  onFinishHandler,
  date,
  handleDateChange,
  userImage,
  user,
  editUser,
}: IProps) => {
  const [name, setName] = useState(user?.name || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  /**
   * @description Maneja los cambios en el campo del nombre
   */
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  /**
   * @description Maneja los cambios en el campo del apellido
   */
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  /**
   * @description Maneja los cambios en el campo del email
   */
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  /**
   * @description Maneja los cambios en el campo del telefono
   */
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  return (
    <form
      style={{
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
      onSubmit={handleSubmit(user ? editUser : onFinishHandler)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormHelperText
              sx={{
                fontWeight: 500,
                fontSize: 16,
                margin: '10px',
                color: '#11142d',
              }}
            >
              Name
            </FormHelperText>
            <TextField
              fullWidth
              defaultValue={user?.name ? name : ''}
              onChange={user?.name ? handleNameChange : ''}
              variant="outlined"
              {...register('name', { required: true })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormHelperText
              sx={{
                fontWeight: 500,
                fontSize: 16,
                margin: '10px',
                color: '#11142d',
              }}
            >
              Last name
            </FormHelperText>
            <TextField
              fullWidth
              defaultValue={user?.lastName ? lastName : ''}
              onChange={user?.lastName ? handleLastNameChange : ''}
              variant="outlined"
              {...register('lastName', { required: true })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormHelperText
              sx={{
                fontWeight: 500,
                fontSize: 16,
                margin: '10px',
                color: '#11142d',
              }}
            >
              Email
            </FormHelperText>
            <TextField
              fullWidth
              defaultValue={user?.email ? email : ''}
              onChange={user?.email ? handleEmailChange : ''}
              variant="outlined"
              {...register('email', { required: true })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormHelperText
              sx={{
                fontWeight: 500,
                fontSize: 16,
                margin: '10px',
                color: '#11142d',
              }}
            >
              Phone
            </FormHelperText>
            <TextField
              fullWidth
              defaultValue={user?.phone ? phone : ''}
              onChange={user?.phone ? handlePhoneChange : ''}
              variant="outlined"
              {...register('phone', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormHelperText
              sx={{
                fontWeight: 500,
                fontSize: 16,
                margin: '10px',
                color: '#11142d',
              }}
            >
              Date of birth
            </FormHelperText>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date of Birth" value={date} onChange={handleDateChange} />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack direction="column" gap={1} justifyContent="center">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={1}
              alignItems="center"
              paddingTop={{ sm: '30px' }}
            >
              <Typography color="#11142d" fontSize={16} fontWeight={500} my={{ xs: '10px', sm: 0 }}>
                Photo
              </Typography>
              <Button
                component="label"
                sx={{
                  width: 'fit-label',
                  color: '#2ed480',
                  textTransform: 'capitalize',
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    handleImageChange(
                      //@ts-ignore
                      e.target.files[0]
                    );
                  }}
                />
              </Button>
            </Stack>
            <Typography fontSize={14} color="#8081991" sx={{ wordBreak: 'break-all' }}>
              {userImage?.name}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <CustomButton type="submit" title={'Submit'} backgroundColor="#475be8" color="#fcfcfc" />
    </form>
  );
};

export default CustomForm;
