import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, signInWithPopup, AuthError } from 'firebase/auth'
import { auth, googleProvider } from '../../api/firebase'


export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

/*export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error: any) {
    // Handle specific error cases without throwing
    switch (error.code) {
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        // Silently handle user cancellation
        return null;
      default:
        // Rethrow other errors
        throw error;
    }
  }
}*/

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: unknown) {
    if (isFirebaseAuthError(error)) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
        case 'auth/cancelled-popup-request':
          // Silently handle user cancellation
          return null;
        default:
          // Rethrow other errors
          throw error;
      }
    } else {
      // Handle unexpected error types
      console.error('Unexpected error during Google sign-in:', error);
      throw error;
    }
  }
};

// Helper function to check if an error is a Firebase AuthError
function isFirebaseAuthError(error: unknown): error is AuthError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string'
  );
}

