import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './App.css'

function App() {

const Schema =yup.object().shape({
  firstName: yup.string().required("This field is required!"),
  lastName: yup.string().required('This field is required!'),
  age: yup.number().typeError('Age must be a number')
  .positive('Age must be a positive number')
  .integer('Age must be an integer')
  .required('Age is required'),
  email: yup.string().email('Invalid email')
  .required('Email is required'),
  phoneNo: yup.string().required('Phone number is required')
  .matches(
    /^\+?[1-9]\d{1,14}$/,
    'Phone number is invalid. It should start with a plus sign (+) and can contain up to 15 digits.'
  ),
  passWord: yup.string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one digit'),

  confirmPassword: yup.string().oneOf([yup.ref('passWord'),null]).required('please confirm your password!'),
})

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver :yupResolver(Schema)})

  const onSubmit = (data) =>{
    console.log(data)
  }



  return (
    <div className="container">
     <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Register with us!</h3>
         <div class="input-control">
              <input type="text" placeholder="firstname" {...register("firstName")} />
              <p>{errors.firstName?.message}</p>              
          </div>
         <div class="input-control">
              
              <input type="text" placeholder="lastname" {...register("lastName")} />
              <p>{errors.lastName?.message}</p>
                
          </div>
         <div class="input-control">
              
              <input type="number" placeholder="age" {...register("age")} />
              <p>{errors.age?.message}</p>
                
          </div>
         <div class="input-control">
              
              <input type="text" placeholder="email" {...register("email")} />
              <p>{errors.email?.message}</p>    
                
          </div>
         <div class="input-control">
              
              <input type="tel" placeholder="tel" {...register("phoneNo")} />
              <p>{errors.phoneNo?.message}</p>  
                
          </div>
          
         <div class="input-control">
              
              <input type="password" placeholder="password" {...register("passWord")} />
              <p>{errors.password?.message}</p>  
                
          </div>
          
         <div class="input-control">
              
              <input type="password" placeholder="confirm password" {...register("confirmPassword")} />
              <p>{errors.confirmPassword?.message}</p>
                
          </div>

          <input type="submit" value="Register"  className="btn"/>
       </form>
    </div>
  )
}

export default App
