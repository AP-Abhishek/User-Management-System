import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, roles: 0, active: 0 });

  const fetchStats = async () => {
    try {
      const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const roleRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/roles`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });

      const userData = await userRes.json();
      const roleData = await roleRes.json();

      if (userRes.ok && roleRes.ok) {
        setStats({
          users: userData.length,
          roles: roleData.length || roleData.roles?.length || 0,
          active: userData.filter((u: any) => u.is_active).length
        });
      }
    } catch (err) {
      toast.error("Failed to load dashboard statistics.");
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  const cardClasses = "md:p-6 p-3 bg-background md:rounded-xl rounded-lg shadow-[0_0_3px] shadow-sky-600 border-l-4 transition-all hover:bg-sky-50 cursor-default md:block flex items-center justify-between";
  const actionBtnClasses = "flex-center gap-2 p-4 rounded-xl border border-stone-200 text-sky-700 font-semibold hover:bg-sky-600 hover:text-white transition-all duration-200 shadow-sm md:text-base text-sm";

  return (
    <div className="md:px-12 px-8 md:py-8 py-4 flex md:flex-row flex-col gap-8">
      <section className="md:w-1/3 w-full p-2 flex items-center flex-col md:border-r-2 border-stone-200 md:pr-8">
        <h1 className="md:self-start text-2xl font-semibold text-sky-700">Dashboard</h1>
        <img src="profile.png" alt="dashboard" className="md:size-64 size-32 my-6" />
        <div className="text-center">
          <h2 className="text-xl font-bold text-stone-800">Welcome, {user?.username}!</h2>
          <p className="text-sm text-stone-500 italic mt-1">
            Logged in as <span className="font-bold text-sky-600">{user?.role?.toUpperCase()}</span>
          </p>
        </div>
        <div className="md:block hidden mt-8 w-full p-4 bg-sky-50 rounded-lg border border-sky-100">
          <p className="text-xs text-sky-800 leading-relaxed text-justify italic">
            "A robust full-stack solution built with React and Express. Efficiently manage user lifecycles and security policies."
          </p>
        </div>
      </section>

      <section className="md:w-2/3 w-full p-2 md:pl-4">
        {user?.role === 'admin' ? (
          <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className={`${cardClasses} border-sky-600`}>
                <span className="text-sm text-stone-500 font-bold uppercase tracking-wider">Total Users</span>
                <h3 className="text-4xl font-bold text-sky-700 md:mt-2 mx-2">{stats.users}</h3>
              </div>
              <div className={`${cardClasses} border-green-600`}>
                <span className="text-sm text-stone-500 font-bold uppercase tracking-wider">Active Sessions</span>
                <h3 className="text-4xl font-bold text-green-600 md:mt-2 mx-2">{stats.active}</h3>
              </div>
              <div className={`${cardClasses} border-stone-600 md:col-span-2`}>
                <span className="text-sm text-stone-500 font-bold uppercase tracking-wider">System Roles</span>
                <h3 className="text-4xl font-bold text-stone-700 md:mt-2 mx-2">{stats.roles}</h3>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="md:text-start text-center text-xl font-bold text-sky-800 mb-6 underline underline-offset-8 decoration-sky-300">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/profile" className={actionBtnClasses}>
                  <svg xmlns="www.w3.org" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </Link>
                <Link to="/users" className={actionBtnClasses}>
                  <svg xmlns="www.w3.org" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Manage Users
                </Link>
                <Link to="/roles" className={`${actionBtnClasses} col-span-2`}>
                  <svg xmlns="www.w3.org" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Security Roles
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 bg-sky-50/50 rounded-3xl border-2 border-dashed border-sky-200">
            <div className="bg-white p-4 rounded-full shadow-sm mb-6">
              <svg xmlns="www.w3.org" className="size-12 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-stone-800">Account Verified</h3>
            <p className="text-stone-500 mt-2 max-w-sm text-center leading-relaxed">
              Your account is currently under review. Specific roles and system privileges will appear here once assigned by the administrator.
            </p>
            <Link to="/profile" className="mt-8 px-6 py-2 bg-white border border-sky-200 text-sky-700 rounded-lg font-medium hover:bg-sky-600 hover:text-white transition-all">
              View My Profile
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

