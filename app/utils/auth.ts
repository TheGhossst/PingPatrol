import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, signInWithPopup } from 'firebase/auth'
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

export const signInWithGoogle = async () => {
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
}

