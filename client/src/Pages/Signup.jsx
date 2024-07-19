import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formdata, setFormData] = useState({})
  const[errorMessage,setErrorMessage] = useState({});
  const[isLoadind, setLoading] = useState(false);
  const handleChange = (e) =>{
    setFormData({...formdata, [e.target.id]: e.target.value.trim()});
    console.log(formdata);
  }
  const handelSubmit = async (e) => {
    e.preventDefault(); //prevent default browser behaivour of refrshing on submit.

    if(!formdata.username || !formdata.password || !formdata.email){
      return setErrorMessage('Please fill out all the fields');
    }

    try {
      const res = await fetch('api/auth/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formdata),
      });
      const data = await res.json();

      
      
    } catch (error){
      console.error(error);
      //show error message to user.
    }
      
    

  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-7">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="  font-bold dark:text-white text-4xl"
          >
            <h2>
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Offside
              </span>
              Tales
            </h2>
          </Link>
          <p className="py-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dolorem quod minima  unde minus laudantium! Quia velit incidunt aspernatur .</p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="email" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="username" id="password" onChange={handleChange} />
            </div>

            <Button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-center" type="submit">Sign Up</Button>
            
            
          </form>
          <div className="flex text-sm gap-2 mt-2">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500 hover:text-blue-600">
              Sign In
            </Link>

          </div>
          {
            errorMessage && (
              <Alert className="mt-5" color='failure'>
                {errorMessage}

              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
