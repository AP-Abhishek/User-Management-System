import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const User = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        if (res.ok) setUsers(data);
        else toast.error(data.error || "Failed to fetch users");
      } catch (err) {
        toast.error("Network Error: Could not reach the server.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="px-12 py-8 flex gap-8">
      <section className="w-1/3 p-2 flex items-center flex-col border-r border-stone-200">
        <h1 className="self-start text-2xl font-semibold text-sky-700">User Management</h1>
        <div className="size-64 my-6 bg-sky-50 rounded-full flex items-center justify-center shadow-inner">
          <span className="text-6xl font-bold text-sky-600">{users.length}</span>
        </div>
        <span className="text-sm text-stone-500 italic uppercase tracking-widest text-center">
          Total Registered Users
        </span>
        <div className="mt-6 w-full space-y-2">
          <div className="flex justify-between p-2 bg-green-50 rounded border-l-4 border-green-500">
            <span className="font-medium text-green-700">Active</span>
            <span className="font-bold">{users.filter(u => u.is_active).length}</span>
          </div>
          <div className="flex justify-between p-2 bg-red-50 rounded border-l-4 border-red-500">
            <span className="font-medium text-red-700">Inactive</span>
            <span className="font-bold">{users.filter(u => !u.is_active).length}</span>
          </div>
        </div>
      </section>

      <section className="w-2/3 p-2">
        <div className="overflow-x-auto rounded-xl shadow-[0_0_3px] shadow-sky-600 bg-background p-2">
          <table className="w-full text-left border-separate border-spacing-y-1">
            <thead className="bg-sky-50 text-sky-700">
              <tr>
                <th className="p-3 font-semibold rounded-l-lg">Name</th>
                <th className="p-3 font-semibold">Username</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr 
                  key={user._id} 
                  className="group hover:bg-sky-50 transition-all duration-200 cursor-default"
                >
                  <td className="p-3 group-hover:rounded-l-lg border-b border-stone-100 group-hover:border-transparent">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-3 text-stone-600 border-b border-stone-100 group-hover:border-transparent">
                    {user.username}
                  </td>
                  <td className="p-3 border-b border-stone-100 group-hover:border-transparent">
                    <span className="px-2 py-0.5 bg-stone-200 rounded text-xs font-bold">
                      {user.role?.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 group-hover:rounded-r-lg border-b border-stone-100 group-hover:border-transparent">
                    <span className={`px-2 py-1 text-xs text-white rounded-sm ${user.is_active ? "bg-green-500" : "bg-red-500"}`}>
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default User;
