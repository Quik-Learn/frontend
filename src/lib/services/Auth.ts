import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';
import { authProvider } from '../../../firebase';

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authProvider, provider);
  } catch (error) {
    console.error(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(authProvider);

    console.log('User signed out');
  } catch (error) {
    console.error(error);
  }
};
export function onAuthStateChanged(callback: (authUser: any | null) => void) {
  return _onAuthStateChanged(authProvider, callback);
}
