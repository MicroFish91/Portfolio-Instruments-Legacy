// import AUTH_USER from './types';
import axios from 'axios';

export const signUp = (formProps) => {async dispatch => {  
    
    const response = await axios.post('/signup', formProps);

    dispatch({type: 'AUTH_USER', payload: response.data.token});

}};

// export const signIn = () => {
//     return {
//         type: AUTH_USER,
//         payload: ''
//     };
// };

// export const signOut = () => {
//     return {
//         type: AUTH_USER,
//         payload: ''
//     };
// };