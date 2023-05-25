'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import CustomForm from '../common/CustomForm';
import { Box } from '@mui/material';
import { ICreateUser } from '../../interfaces/user/ICreateUser';
import UserService from '../../services/UserService';
import { calculateAge } from '../../utils/age';
import { handlerCatchError } from '../../utils/handleErrors';

const FormWrapper = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userImage, setUserImage] = useState({
    name: '',
    url: '',
  });
  const [date, setDate] = useState<Date | null>(null);
  const [userAge, setUserAge] = useState<number>(0);
  type FormValues = Record<string, any>;

  const createUser = async (data: ICreateUser) => {
    const { name, lastName, email, phone } = data;

    UserService.create({
      name,
      lastName,
      email,
      phone,
      photo: userImage.url,
      age: userAge,
    })
      .then(() => {
        toast.success('Se creó el producto exitosamente');
        router.push('/users');
      })
      .catch((err) => {
        handlerCatchError(err, ['Error al crear un usuario']);
      });
  };
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setUserImage({
        name: file?.name,
        url: result,
      })
    );
  };

  const handleDateChange = (date: any) => {
    const selectedDate = new Date(date.$d);
    const age = calculateAge(selectedDate);
    setUserAge(age);
  };
  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: '0 auto',
      }}
      padding={{ xs: '20px', sm: '0px' }}
    >
      <CustomForm
        register={register}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        onFinishHandler={createUser}
        date={date}
        handleDateChange={handleDateChange}
        userImage={userImage}
      />
    </Box>
  );
};

export default FormWrapper;
