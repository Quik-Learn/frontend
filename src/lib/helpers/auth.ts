import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// export function requireAuthentication(gssp: GetServerSideProps) {
//   return async (ctx: GetServerSidePropsContext) => {
//     const { req } = ctx;
//     const token = req.cookies.token;
//     const accountType = req.cookies.accountType;
//     console.log('hererer', token);
//     if (!token) {
//       return {
//         redirect: {
//           permanent: false,
//           destination: '/',
//         },
//       };
//     }
//     return await gssp(ctx);
//   };
// }

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req, resolvedUrl } = ctx;
    const token = req.cookies.token;
    const accountType = req.cookies.accountType?.toLowerCase() || '';

    // Check if the user is authenticated
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    // Define path-to-accountType redirection rules
    const pathAccountMap: Record<string, string> = {
      student: 'student',
      parent: 'parent',
      tutor: 'tutor',
    };

    // Determine if the path contains any specific role keyword
    const matchedPathRole = Object.keys(pathAccountMap).find((role) =>
      resolvedUrl.includes(role)
    );

    // Redirect if there is a mismatch between the role in the URL and the account type
    if (matchedPathRole && pathAccountMap[matchedPathRole] !== accountType) {
      return {
        redirect: {
          permanent: false,
          destination: `/${pathAccountMap[accountType]}`, // Redirect to the correct path for the account type
        },
      };
    }

    // Run the original GSSP
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
