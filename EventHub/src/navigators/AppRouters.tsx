
import React, { useEffect, useState } from 'react'
import MainNavigator from './MainNavigator'
import Authnavigator from './AuthNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'
import { SplashScreen } from '../screens'

const AppRouters = () => {

  const [isShowSplash, setIsShowSplash]= useState(true);
  
  const{getItem}= useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch()

  useEffect(()=>{
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false)
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const res = await getItem();

    console.log(res);
    res && dispatch(addAuth(JSON.parse(res)));
  };
  
  return (
    <>
       {isShowSplash? <SplashScreen/> : auth.accesstoken ? <MainNavigator/> : <Authnavigator/>}
    </>
  );
};

export default AppRouters