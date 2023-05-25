import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import UserService from '../../src/services/UserService';
import { parseObjectsProps } from '../../src/utils/parse';

/**
 * @description Para renderizar la pagina de manera dinamica
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const allusers = await UserService.getUsers();
  const paths = allusers.map(({ _id }) => ({
    params: {
      _id,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  const user = await UserService.getUserById(ctx.params?._id as string);
  return {
    props: {
      user: parseObjectsProps(user),
    },
    revalidate: 600,
  };
};

const UserEdit = ({ user }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div></div>;
};

export default UserEdit;
