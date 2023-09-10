import { FormInput, SubmitBtn } from "../Components"
import {Form, Link, redirect, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { loginUser } from "../Features/User/userSlice"
import { customFetch } from "../utils"

export const action = (store)=> async({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const response = await customFetch.post('/auth/local', data);
    store.dispatch(loginUser(response.data));
    toast.success('Logged in successfully');
    return redirect('/');
  } catch (error) {
    const errorMessage = error?.response?.data?.error?.message || 'please double check your credentials'
    console.log(error?.response?.data);
    toast.error(errorMessage);
    return null;
  }
}
const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const guestUser = async()=>{
    try {
      const response = await customFetch.post('/auth/local', {
        identifier:'test@test.com',
        password: 'secret'
      })
      dispatch(loginUser(response.data))
      toast.success('welcome guest user')
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('guest user login error please try again')
    }
  }
  // const userData = useActionData();
  // console.log({userData});
  // if({userData}){
  //   dispatch(loginUser({userData}));
  // }
  return (
    <section className="h-screen grid place-items-center">
    <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
      <h4 className="text-center text-3xl font-bold">Login</h4>
    <FormInput type='email' name='identifier' label='Email' />
    <FormInput type='password' name='password' label='Password' />
    <div className="mt-4">
    <SubmitBtn text={'Login'} />
    </div>
    <button className="btn btn-secondary btn-block" type="button" onClick={guestUser}>Guest User</button>
    <p className="text-center">
      Not a member yet ?{' '}<Link to='/register' className="ml-2 link link-hover link-primary capitalize">Register</Link>
    </p>
    </Form>
    </section>
  )
}
export default Login