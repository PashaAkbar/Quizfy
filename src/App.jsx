import {Route, Routes, Navigate} from 'react-router-dom';
// import SignIn from './page/signin';
// import Home from './page/home';
// import SignUp from './page/signup';
// import AllAgenda from './page/allAgenda';
import SignIn from './pages/signIn';
import Home from './pages/home';
import Question from './pages/question';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({element}) => {
  const isLogin = localStorage.getItem('isLogin');
  if (isLogin) {
    return element;
  } else {
    return <Navigate to="/signin" />;
  }
};

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route
        path="/question"
        element={<PrivateRoute element={<Question />} />}
      />

      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
