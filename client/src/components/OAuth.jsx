import { Button } from "flowbite-react"
import {AiFillGoogleCircle} from "react-icons/ai";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import { app } from "../firebase";

function OAuth() {
  const auth = getAuth(app);


  const handleGoogleClick = async () => {

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'})
    try {
      const resultFromGoogle = await signInWithPopup(auth,provider)
    
      console.log(resultFromGoogle);
            
    } catch (error) {
        console.log(error);
            
    }

  }

  return (
    <Button type="button" gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className="h-6 w-6 mr-2" />
        Continue With Google

      
    </Button>
  )
}

export default OAuth
