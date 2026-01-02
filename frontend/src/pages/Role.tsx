import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type RolesType = {
  _id: string;
  name: string;
};

const Role = () => {
  const [roles, setRoles] = useState<RolesType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newRoleName, setNewRoleName] = useState<string>("");
  const [editingRole, setEditingRole] = useState<RolesType | null>(null);
  const [deletingRole, setDeletingRole] = useState<RolesType | null>(null);

  const fetchRoles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/roles`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      if (res.ok) {
        setRoles(Array.isArray(data) ? data : (data.roles || []));
      } else {
        toast.error(data.error || "Failed to fetch roles.");
      }
    } catch (err) {
      toast.error("Network Error: Could not reach the server.");
    }
  };

  const handleAddOrUpdateRole = async () => {
    if (!newRoleName.trim()) return toast.error("Role name is required.");

    const url = editingRole
      ? `${import.meta.env.VITE_BACKEND_URL}/api/roles/${editingRole._id}`
      : `${import.meta.env.VITE_BACKEND_URL}/api/roles/add`;

    const method = editingRole ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name: newRoleName }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || `Role ${editingRole ? "updated" : "added"} successfully.`);
        closeModal();
        fetchRoles();
      } else {
        toast.error(data.error || "Operation failed.");
      }
    } catch (err) {
      toast.error("Network Error.");
    }
  };

  const confirmDelete = async () => {
    if (!deletingRole) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/roles/${deletingRole._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Role deleted.");
        setDeletingRole(null);
        fetchRoles();
      } else {
        toast.error(data.error || "Delete failed.");
      }
    } catch (err) {
      toast.error("Network Error.");
    }
  };

  const openEditModal = (role: RolesType) => {
    setEditingRole(role);
    setNewRoleName(role.name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRole(null);
    setNewRoleName("");
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const spanClasses = "ml-0.5 block md:text-lg text-sm font-semibold text-sky-600";
  const labelClasses = "block md:my-2";

  return (
    <>
      <div className="px-12 py-8 flex gap-8">
        <section className="w-1/3 p-2 flex items-center flex-col border-r border-stone-200">
          <h1 className="self-start text-2xl font-semibold text-sky-700">Role Management</h1>
          <img src="roles.png" alt="roles" className="size-64 my-6" />
          <span className="text-sm text-stone-500 italic uppercase tracking-widest text-center">
            Define System Permissions
          </span>
          <p className="mt-4 text-center text-sm text-stone-600 px-4 leading-relaxed">
            Manage granular access levels for your application. Roles defined here determine the actions users can perform across the system.
          </p>
        </section>

        <section className="w-2/3 p-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-sky-800">Available Roles</h2>
            <button
              className="bg-sky-600 text-white px-3 py-1.5 rounded-md self-start hover:bg-sky-700 transition-all active:bg-sky-900"
              onClick={() => setShowModal(true)}
            >
              + Create Role
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {Array.isArray(roles) && roles.map((role) => (
              <div
                key={role._id}
                className="group p-4 bg-background rounded-xl shadow-[0_0_3px] shadow-sky-600 border-l-4 border-sky-600 hover:bg-sky-50 transition-all flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold text-sky-700">{role.name.toUpperCase()}</h3>
                  <span className="text-xs font-semibold text-stone-400 italic">ID: {role._id}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(role)}
                    className="p-2 text-sky-600 hover:bg-sky-100 rounded-full transition-colors"
                  >
                    <svg xmlns="www.w3.org" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeletingRole(role)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <svg xmlns="www.w3.org" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showModal && (
        <div className="fixed top-40 left-1/2 -translate-x-1/2 bg-background w-1/3 rounded-xl p-6 backdrop-blur-md shadow-[0_0_3px] shadow-sky-600 z-50">
          <h2 className="text-xl font-bold mb-4 text-sky-700">
            {editingRole ? "Update Role" : "Create New Role"}
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="roleName" className={labelClasses}>
              <span className={spanClasses}>Role Name</span>
              <input
                id="roleName"
                type="text"
                className="px-3 py-1.5 my-2 w-full rounded-md md:text-lg bg-white border border-stone-200 focus:outline-sky-300"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value.replace(/[^A-Za-z]/g, ""))}
                placeholder="e.g. Manager"
              />
            </label>
          </form>
          <section className="flex gap-4 justify-end mt-6">
            <button className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700" onClick={closeModal}>Cancel</button>
            <button className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700" onClick={handleAddOrUpdateRole}>
              {editingRole ? "Update" : "Create"}
            </button>
          </section>
        </div>
      )}

      {deletingRole && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background w-96 rounded-xl p-6 shadow-[0_0_10px] shadow-red-200 border-t-4 border-red-600">
            <h2 className="text-xl font-bold text-stone-800">Delete Role?</h2>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Are you sure you want to delete the role <span className="font-bold text-red-600">"{deletingRole.name.toUpperCase()}"</span>? This action cannot be undone.
            </p>
            <section className="flex gap-4 justify-end mt-8">
              <button
                className="px-4 py-2 text-stone-600 font-semibold hover:bg-stone-100 rounded-md transition-colors"
                onClick={() => setDeletingRole(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition-all active:scale-95 shadow-md"
                onClick={confirmDelete}
              >
                Delete Role
              </button>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Role;

