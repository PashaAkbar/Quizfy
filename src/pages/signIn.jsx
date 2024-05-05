import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {login} from '../redux/authSlice';
import {setEmailAdd} from '../redux/userSlice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [redirectToProtectedRoute, setRedirectToProtectedRoute] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setEmailAdd(email));
    dispatch(login());
    setRedirectToProtectedRoute(true);
  };

  if (redirectToProtectedRoute) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg lg:max-w-5xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url('https://www.diykamera.com/wp-content/uploads/2017/06/cara-memotret-milky-way-dengan-kamera-dslr.png')`,
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <p className="mt-4 text-2xl font-bold text-center text-white">
            Welcome back!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-white">
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg s focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
              </div>

              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg s focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 "
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-8">
            <span className="w-1/5 border-b md:w-1/4"></span>

            {/* <Link to={'/signup'} className="text-sm text-white hover:underline">
              or sign up
            </Link> */}

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
