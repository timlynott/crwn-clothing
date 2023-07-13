import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  useEffect} from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from './store/user/user.action';


import Home from './routes/home/home.component.jsx';
import Navigation from './routes/navigation/navigation.component.jsx';
import Authentication from './routes/authentication/authentication.component.jsx';
import Shop from './routes/shop/shop.component.jsx';
import CheckoutPage from './routes/checkout/checkout.component.jsx';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<CheckoutPage />} />

      </Route>
    </Routes>  
  ) 
};

export default App;
