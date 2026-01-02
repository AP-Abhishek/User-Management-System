import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-9xl font-extrabold text-stone-200 tracking-tighter">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-semibold text-sky-800 bg-white/80 px-4 py-1 backdrop-blur-sm">
            Page Not Found
          </p>
        </div>
      </div>

      <div className="max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">
          Oops! You've wandered off the map.
        </h2>
        <p className="text-stone-600">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-stone-300 rounded-md hover:bg-stone-50 transition-all ease-linear active:scale-95"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 transition-all ease-linear active:bg-sky-900 active:scale-95 shadow-md shadow-sky-100"
        >
          Take Me Home
        </button>
      </div>

      <div className="mt-12 pt-8 border-t border-stone-100 w-full max-w-sm">
        <p className="text-sm text-stone-400">
          Think this is a bug? <a href="https://github.com/AP-Abhishek/User-Management-System/issues" target="_blank" className="text-sky-600 hover:underline">Report it on GitHub</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;