import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

export const authUserWithEmailAndPassword = async (email: string, password: string) => {
  
  
  const result = await signInWithEmailAndPassword(auth, email, password)
  console.log(result.user)
}