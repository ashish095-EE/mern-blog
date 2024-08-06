import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formdata, setFormData] = useState({ email: '', password: '' });
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default browser behavior of refreshing on submit.

    if (!formdata.password || !formdata.email) {
      return dispatch(signInFailure('Please fill out all the fields! '));
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      
      if (!res.ok) {
        dispatch(signInFailure(data.message || 'Something went wrong!'));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-7">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <h2>
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Offside
              </span>
              Tales
            </h2>
          </Link>
          <p className="py-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dolorem quod minima unde minus laudantium! Quia velit incidunt aspernatur.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="email" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="********" id="password" onChange={handleChange} />
            </div>
            <Button
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className="p-3">Loading...</span>
                </>
              ) : 'Sign In'}
            </Button>
          </form>
          <div className="flex text-sm gap-2 mt-2">
            <span>Dont Have an account?</span>
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
