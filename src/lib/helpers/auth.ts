import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;
    const token = req.cookies.token;
    console.log('hererer');
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
    return await gssp(ctx);
  };
}

export function hasAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;
    const token = req.cookies.token;

    if (token) {
      return {
        redirect: {
          permanent: false,
          destination: '/parent',
        },
      };
    }
    return await gssp(ctx);
  };
}
