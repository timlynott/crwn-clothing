import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';


const SignIn = () => {
    const logGoogleUSer = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    };
    return (
        <div className='sign-in'>
            <h1>Sign In</h1>
            <button onClick={logGoogleUSer}>Sign In With Google</button>
        </div>
    );
};


export default SignIn; 