import { LogIn  } from '../components/LogIn';

function LogInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <LogIn />
      </div>
    </div>
  );
}

export default LogInPage;
