
import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithEmailAndPassword,} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = { 
    email: '',
    password: ''
};



const SignInForm = () => {  
    const [ formFields, setFormFields] = useState(defaultFormFields);
    const {email, password } = formFields;   

    const resetFormFields = () => {setFormFields(defaultFormFields)};

    const signInWithGoogle = async () => {
        const {user}= await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => { 
        event.preventDefault();

        try {
            const response = await signInAuthWithEmailAndPassword(email, password);
            console.log(response);
        
            resetFormFields();

        } catch(error) {
            switch(error.code) {
                case 'auth/invalid-email':
                    alert('Please enter a valid email address.');
                    break;
                case 'auth/user-not-found':
                    alert('User not found.');
                    break;
                    default:
                    console.log(error.message);
            }
            // if (error.code === 'auth/wrong-password') {
            //     alert('Wrong password.');
            // } else { auth/user-not-found)
            // console.log(error.message);
        }
        }
    



    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
        <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={ handleSubmit}>
                
                <FormInput 
                label={"Email"} 
                required 
                onChange={handleChange}  
                type="email" 
                name="email" 
                value={email}/>
                
                <FormInput 
                label={"Password"} 
                required onChange={handleChange}  
                type="password" 
                name="password" 
                value={password} />
            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
            </div>
            </form>
        </div>
    );
}

export default SignInForm;
