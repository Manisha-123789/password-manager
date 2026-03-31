export const validate = (name : string, email : string, password : string) => {
  const newErrors = {
    userName: '',
    email: '',
    password: '',
  };

  if (!name) {
    newErrors.userName = 'Name is required';
  } else if (name.length < 3) {
    newErrors.userName = 'Minimum 3 characters required';
  }

  if (!email) {
    newErrors.email = 'Email is required';
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  ) {
    newErrors.email = 'Invalid email address';
  }

  if (!password) {
    newErrors.password = 'Password is required';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
      password
    )
  ) {
    newErrors.password = 'Password must be strong';
  }

  return newErrors;

//   setErrors(newErrors);

//   return !newErrors.userName && !newErrors.email && !newErrors.password;
};


export const loginValidate = (email : string, password : string) =>{
  const error = {
    email : '',
    password : ''
  }
  if(!email.length){
    error.email = 'Please enter the valid email';
  }

  if(!password.length){
    error.password = 'please enter the valid password';
  }

  return error;
}