import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../redux/authSlice';

const Home = () => {
  const userEmail = localStorage.getItem('email');
  const score = JSON.parse(localStorage.getItem('score'));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/signin';
  };

  const handleClearScore = () => {
    localStorage.removeItem('score');
    window.location.reload();
  };

  return (
    <div>
      <div className="w-full flex items-end justify-end absolute">
        <button
          className="text-sm max-w-xl rounded-xl hover:bg-white hover:text-blue-500 text-white px-3 py-2 border-white border-2 mt-3 mx-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500">
        <div className="flex flex-col gap-3 justify-center items-center">
          {userEmail && (
            <div className="text-4xl text-white font-extrabold">
              Welcome {userEmail} !
            </div>
          )}
          <Link
            to={'/question'}
            className="text-2xl max-w-xl rounded-3xl hover:bg-white hover:text-blue-500 text-white px-3 py-2 border-white border-2 mt-3"
          >
            Start Quiz
          </Link>
          {score && (
            <div className="flex flex-col p-8 gap-2 items-center justify-center border-2 border-white text-white rounded-xl">
              <div className="text-4xl font-bold">Last Quiz Result</div>
              <div className="text-xl">Correct Answer : {score.correct}</div>
              <div className="text-xl">Wrong Answer : {score.wrong}</div>
              <button className="text-xl" onClick={handleClearScore}>
                Clear the Record
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
