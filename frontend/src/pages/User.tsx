import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const User = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<any>(null);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "user"
  });

  const [roles, setRoles] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (err) {
      toast.error("Error loading users");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/roles`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      if (res.ok) setRoles(data);
    } catch (err) {
      toast.error("Error finding roles");
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("User added successfully");
        setIsAddModalOpen(false);
        fetchUsers();
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  const handleUpdateUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${selectedUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          role: selectedUser.role,
          is_active: selectedUser.is_active
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "User updated");
        setIsEditModalOpen(false);
        fetchUsers();
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${deletingUser._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "User removed");
        setDeletingUser(null);
        setIsEditModalOpen(false);
        fetchUsers();
      } else {
        toast.error(data.error || "Delete failed");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="md:px-12 px-8 md:py-8 py-4 flex md:flex-row flex-col gap-8">
      <section className="md:w-1/3 w-full p-2 flex items-center flex-col md:border-r border-stone-200">
        <h1 className="md:self-start text-2xl font-semibold text-sky-700">User Management</h1>
        <div className="size-56 mt-6 bg-sky-50 rounded-full flex flex-col items-center justify-center shadow-inner border-4 border-white">
          <span className="text-5xl font-black text-sky-600">{users.length}</span>
          <span className="text-[10px] text-sky-400 font-bold tracking-tighter uppercase">Total Users</span>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-2/3 my-8 bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-md"
        >
          + Add New User
        </button>
        <div className="w-full space-y-3">
          <div className="flex justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
            <span className="text-sm font-semibold text-green-700">Active Accounts</span>
            <span className="font-bold text-green-800">{users.filter(u => u.is_active).length}</span>
          </div>
          <div className="flex justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
            <span className="text-sm font-semibold text-red-700">Inactive Accounts</span>
            <span className="font-bold text-red-800">{users.filter(u => !u.is_active).length}</span>
          </div>
        </div>
      </section>

      <section className="md:w-2/3 w-full p-2">
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="p-4 text-xs font-bold text-stone-500 uppercase">User Details</th>
                <th className="p-4 text-xs font-bold text-stone-500 uppercase">Role</th>
                <th className="p-4 text-xs font-bold text-stone-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {users.map((user) => (
                <tr
                  key={user._id}
                  onClick={() => { setSelectedUser(user); setIsEditModalOpen(true); }}
                  className="hover:bg-sky-50/50 cursor-pointer transition-colors"
                >
                  <td className="p-4">
                    <div className="font-semibold text-stone-800">{user.firstName} {user.lastName}</div>
                    <div className="text-xs text-stone-400">@{user.username}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-stone-100 rounded text-[10px] font-bold text-stone-600 uppercase tracking-tight">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className={`size-2.5 rounded-full ${user.is_active ? "bg-green-500" : "bg-red-500"}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isAddModalOpen && (
        <div className="md:p-0 p-6 fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <form onSubmit={handleAddUser} className="bg-white p-8 rounded-2xl w-100 shadow-2xl border border-stone-100">
            <h2 className="text-xl font-bold text-stone-800 mb-6">Create New User</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input required placeholder="First Name" className="border p-2.5 rounded-lg text-sm outline-sky-600" onChange={e => setNewUser({ ...newUser, firstName: e.target.value })} />
              <input required placeholder="Last Name" className="border p-2.5 rounded-lg text-sm outline-sky-600" onChange={e => setNewUser({ ...newUser, lastName: e.target.value })} />
            </div>
            <input required placeholder="Username" className="w-full border p-2.5 rounded-lg text-sm mb-3 outline-sky-600" onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
            <input required type="email" placeholder="Email Address" className="w-full border p-2.5 rounded-lg text-sm mb-3 outline-sky-600" onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
            <input required type="password" placeholder="Password" className="w-full border p-2.5 rounded-lg text-sm mb-6 outline-sky-600" onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
            <div className="flex gap-3">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-2.5 text-stone-500 font-semibold hover:bg-stone-50 rounded-lg transition-all">Cancel</button>
              <button type="submit" className="flex-1 py-2.5 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 shadow-md shadow-sky-200">Register</button>
            </div>
          </form>
        </div>
      )}

      {isEditModalOpen && selectedUser && (
        <div className="md:p-0 p-6 fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-100 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-stone-800">User Configuration</h2>
              <p className="text-sm text-stone-400">Modifying profile for {selectedUser.username}</p>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Account Role</label>
                <select className="w-full border-2 p-2.5 rounded-xl font-semibold text-stone-700 outline-sky-600" value={selectedUser.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}>
                  {
                    roles.map(role => (
                      <option key={role._id || role.name} value={role.name}>{role.name.toUpperCase()}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Login Status</label>
                <select className="w-full border-2 p-2.5 rounded-xl font-semibold text-stone-700 outline-sky-600" value={selectedUser.is_active ? "true" : "false"} onChange={(e) => setSelectedUser({ ...selectedUser, is_active: e.target.value === "true" })}>
                  <option value="true">Permit Access (Active)</option>
                  <option value="false">Revoke Access (Inactive)</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setDeletingUser(selectedUser)} className="px-4 py-2 text-red-500 font-bold hover:bg-red-50 rounded-lg transition-all text-sm">Delete User</button>
                <div className="flex-1 flex gap-2">
                  <button onClick={() => setIsEditModalOpen(false)} className="flex-1 py-2 text-stone-400 font-semibold text-sm">Close</button>
                  <button onClick={handleUpdateUser} className="flex-1 py-2 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 text-sm">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletingUser && (
        <div className="md:p-0 p-6 fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-60">
          <div className="bg-white w-96 rounded-xl p-6 shadow-[0_0_10px] shadow-red-200 border-t-4 border-red-600">
            <h2 className="text-xl font-bold text-stone-800">Delete User?</h2>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-red-600">{deletingUser.firstName} {deletingUser.lastName}</span>? This action cannot be undone.
            </p>
            <section className="flex gap-4 justify-end mt-8">
              <button className="px-4 py-2 text-stone-600 font-semibold hover:bg-stone-100 rounded-md transition-colors" onClick={() => setDeletingUser(null)}>
                Cancel
              </button>
              <button className="bg-red-600 text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition-all active:scale-95 shadow-md" onClick={confirmDelete}>
                Delete User
              </button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
