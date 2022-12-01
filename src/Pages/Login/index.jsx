import React, {useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';

//import {FcGoogle} from 'react-icons/fc';

import bookshelf from '../../Assets/Images/bookshelf.png';



const CLIENT_ID = process.env.REACT_APP_GOOGLE_API_CLIENT_ID


const Login = () => {


    //let's use the react navigation to navigate to the home page after loging in successfully
     const navigate = useNavigate();

   /*const responseGoogle = (response) => {
        console.log(response);
   }*/

//    useEffect(() => {
//     const initClient = () => {
//             gapi.client.init({
//             clientId: CLIENT_ID,
//             scope: ''
//             });
//         };
//         gapi.load('client:auth2', initClient);
//     });

   const onSuccess = (res) => {
        //console.log('[Login Successfull] currentUser:', res.profileObj);

        localStorage.setItem('user', JSON.stringify(res.profileObj));

        const {name, googleId, imageUrl} = res.profileObj;

        console.log(name, googleId, imageUrl);
        //doc to save to the sanitiy database
        // const doc = {
        //     _id: googleId,
        //     _type: 'user',
        //     username:name,
        //     image: imageUrl
        // };


        // //create the user if not already created
        // client.createIfNotExists(doc).then((res) => {
        //     console.log(res);
        //     //navigate to the home page
        //     navigate('/', {replace: true});

        // }).catch((err) => {
        //     console.log(err);
        // });


    };
    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };


    return (
        <div className='flex h-screen place-content-center dark:text-white dark:bg-gray-600'>
            <div className='LOGIN-CONTAINER mt-14 flex flex-col items-center text-gray-600 bg-slate-100 rounded shadow-lg shadow-slate-500 w-[80%] h-[75%]  sm:w-[60%] xs:w-[55%] md:w-[50%] xm:w-[45%] lg:w-[40%] xl:w-[30%] '>
                    <div className='flex w-full  items-center place-content-center'>
                        <img src={bookshelf} alt="logo" className="w-20 h-20 mb-5"/> 
                        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                    </div>
                <form className='LOGIN-INPUTS flex flex-col items-center mx-4 min-w-[75%]'>
                    <input type='text' autoComplete='username' placeholder='Username' className='w-full m-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-gray-500'/>
                    <input type='password' autoComplete='new-password' placeholder='Password' className='w-full m-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-gray-500'/>
                    <div className='LOGIN-BUTTON flex items-center min-w-[90%] mt-4'>
                        <button type='submit'  className='m-2 p-2 rounded-full border-2 w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium text-xl'>Login</button>
                    </div>
                </form>
                
                {/* Line separator */}
                <div className="flex min-w-[70%]  items-center">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-gray-900 text-md font-medium">OR</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>
                {/**Log in with gmail or facebook */}
                <div className='LOGIN-OTHER flex flex-col items-center justify-center min-w-[70%] mt-5'>
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        render={(renderProps) => (
                            <button  
                                onClick={renderProps.onClick}
                                disabled = {renderProps.disabled}
                                type="button" 
                                className="cursor-pointer text-white w-full justify-center bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                                
                                >
                                
                                <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                Sign in with Google
                               
                            </button>
                        )}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        //isSignedIn={true}
                    />

                    <button type="button" className="text-white justify-center w-full bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                        <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
                        Sign in with Facebook
                    </button>
                </div>
                {/**Don't have an account? Register */}
                <div className='REGISTER flex flex-col items-center min-w-[70%] mt-8 mb-4'>
                    <p className='text-sm font-medium'>Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};


export default Login;