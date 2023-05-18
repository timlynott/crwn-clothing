
import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import Button from '../../components/button/button.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {
 

    const logGoogleUSer = async () => {
        const response = await signInWithGooglePopup();
        await createUserDocumentFromAuth(response.user);
        console.log(response);
    };



    return (
        <div className='sign-in'>
            <h1>Sign In</h1>
            <Button buttonType='google' onClick={logGoogleUSer}>Sign In With Google</Button>
           <SignUpForm />
        </div>
    );
};


export default SignIn; 