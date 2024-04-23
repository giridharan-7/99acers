import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
    const [formData, setFormData] = useState({})
    const {loading, error} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.id] : e.target.value,
            }
        )
    }
    const handleSubmit = async(e) => {
        // It prevents refreshing the page when we click the submit button
        e.preventDefault();
        try{
            dispatch(signInStart())
            // use the fetch method to req the api route localhost:3000/api/auth/signup
            const res = await fetch('/api/auth/signin', 
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                    // Indicating that the request body is json formated
                },
                body: JSON.stringify(formData),
                // Converts the formData to a json string
            });
            const data = await res.json();
            if(data.success === false){
                setError(data.message)
                dispatch(signInFailure(data.message))
                return;
            }
            dispatch(signInSuccess(data))
            navigate('/')
        }catch(error){
            dispatch(signInFailure(error.message))
        }
        
    }
    console.log(formData)
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
                <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-8-'>{loading ? 'Loading...' : 'SignIn' }</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Dont have an account?</p>
                <Link to={"/signup"}>
                    <span className='text-blue-700'>Sign-Up</span>
                </Link>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    )
}
