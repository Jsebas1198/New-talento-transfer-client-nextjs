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
import { IProps } from './IProps';

const FormWrapper = ({ user }: IProps) => {
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

  /**
   * @description Función para crear un usuario
   */
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
        toast.success('Se creó el usuario exitosamente');
        router.push('/users');
      })
      .catch((err) => {
        handlerCatchError(err, ['Error al crear un usuario']);
      });
  };

  /**
   * @description Función para editar un usuario
   */
  const editUser = async (data: ICreateUser) => {
    if (user?._id) {
      const { name, lastName, email, phone } = data;

      UserService.updateUser(
        {
          name,
          lastName,
          email,
          phone,
          photo: userImage.url,
          age: userAge,
        },
        user._id
      )
        .then(() => {
          toast.success('Se modificó el usuario exitosamente');
          router.push('/users');
        })
        .catch((err) => {
          handlerCatchError(err, ['Error al crear un usuario']);
        });
    }
  };

  /**
   * @description Función para procesar un archivo de una imagen y actualizar el estado de la imagen del usuario.
   */
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

  /**
   * @description Función para encontrar los años del usuario
   */
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
        editUser={editUser}
        date={date}
        handleDateChange={handleDateChange}
        userImage={userImage}
        user={user}
      />
    </Box>
  );
};

export default FormWrapper;
