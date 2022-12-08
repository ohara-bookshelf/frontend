import {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../Assets/Images/bookshelf.png';

class Register extends Component{
    render(){
        return(
            <div className="flex justify-center min-w-[80%] h-screen dark:bg-gray-600">
                <div className="flex flex-col justify-center mt-14 items-center bg-slate-100 text-gray-700 w-[380px] md:w-[400px] lg:w-[480px] h-[510px] rounded shadow-lg shadow-slate-500">
                    <div className='flex w-full  items-center place-content-center'>
                        <img src={logo} alt="logo" className="w-20 h-20 mb-5"/> 
                        <h1 className="text-3xl font-bold text-gray-900">Register</h1>
                    </div>
                    
                    <form className="flex flex-col justify-center items-center min-w-[80%]">
                        <div className="flex flex-col justify-center items-center w-full">
                            <label className="text-gray-900 dark:text-gray-500">Username</label>
                            <input autoComplete='username' className="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="text" placeholder="Username"/>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                            <label className="text-gray-900 dark:text-gray-500">Email</label>
                            <input autoComplete='username' className="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="email" placeholder="Email"/>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                            <label className="text-gray-900 dark:text-gray-500">Password</label>
                            <input autoComplete='new-password' className="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="password" placeholder="Password"/>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                            <label className="text-gray-900 dark:text-gray-500">Confirm Password</label>
                            <input autoComplete='new-password' className="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="password" placeholder="Confirm Password"/>
                        </div>
                        <div className='LOGIN-BUTTON flex items-center min-w-[70%] mt-3'>
                            <button className='m-2 p-2 rounded-full border-2 w-full text-white bg-gradient-to-r from-purple-500 via-purple-500 to-purple-800 hover:bg-gradient-to-br font-medium text-xl'>Register</button>
                        </div>
                    </form>
                    {/*Already user? Login*/}
                    <div className="flex justify-center items-center w-full mt-3 text-sm font-medium mb-5">
                    <p className='text-sm font-medium'>Already user? <Link to='/login' className='text-blue-500'>Login</Link></p>
                    </div>
                </div>
            </div>
        );          
    };
};

export default Register;