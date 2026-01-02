import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 relative">
        <div className="size-24 bg-red-100 rounded-full flex items-center justify-center">
          <img src="forbidden.png" alt="forbidden" />
        </div>
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
          403
        </div>
      </div>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">Access Denied</h1>
      <p className="text-stone-600 max-w-md mb-8">
        You do not have the necessary permissions to view this resource.
        This action has been logged as part of our <strong>RBAC security policy</strong>.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors shadow-md shadow-sky-100"
        >
          Return Home
        </button>
      </div>

      <p className="mt-12 text-sm text-stone-400">
        If you believe this is an error, please contact your system administrator.
      </p>
    </div>
  );
};

export default Forbidden;