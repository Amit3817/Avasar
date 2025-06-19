import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15', sponsorId: 'SP001' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', joinDate: '2024-01-20', sponsorId: 'SP002' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'inactive', joinDate: '2024-01-25', sponsorId: null },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'user', status: 'active', joinDate: '2024-02-01', sponsorId: 'SP003' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'user', status: 'pending', joinDate: '2024-02-05', sponsorId: 'SP004' }
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userList, setUserList] = useState(users);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'from-green-500 to-emerald-500';
      case 'inactive': return 'from-gray-500 to-gray-600';
      case 'pending': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '✅';
      case 'inactive': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUserList(userList.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleExport = () => {
    alert('Exporting user data (simulated)');
  };

  const handleAnalytics = () => {
    navigate('/admin/analytics');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-4">👥</span>
            User Management
          </h1>
          <p className="text-lg text-gray-600">
            Manage user accounts, view profiles, and monitor user activities across the platform.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{users.length}</h3>
            <p className="text-gray-600 font-medium">Total Users</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">✅</span>
              </div>
              <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{users.filter(u => u.status === 'active').length}</h3>
            <p className="text-gray-600 font-medium">Active Users</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⏳</span>
              </div>
              <span className="text-sm font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                Pending
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{users.filter(u => u.status === 'pending').length}</h3>
            <p className="text-gray-600 font-medium">Pending Users</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🤝</span>
              </div>
              <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                Sponsored
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{users.filter(u => u.sponsorId).length}</h3>
            <p className="text-gray-600 font-medium">Sponsored Users</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        <div className="relative z-10">
          <div className="p-8 border-b border-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="mr-3">📋</span>
              User List
            </h2>
            <p className="text-gray-600">View and manage all registered users</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary-600 to-blue-600 text-white">
                <tr>
                  <th className="px-8 py-6 text-left font-bold text-lg">User</th>
                  <th className="px-8 py-6 text-left font-bold text-lg">Email</th>
                  <th className="px-8 py-6 text-left font-bold text-lg">Status</th>
                  <th className="px-8 py-6 text-left font-bold text-lg">Join Date</th>
                  <th className="px-8 py-6 text-left font-bold text-lg">Sponsor ID</th>
                  <th className="px-8 py-6 text-left font-bold text-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-600">{user.email}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 bg-gradient-to-r ${getStatusColor(user.status)} rounded-xl flex items-center justify-center mr-3 shadow-lg`}>
                          <span className="text-white text-sm">{getStatusIcon(user.status)}</span>
                        </div>
                        <span className={`font-bold capitalize ${
                          user.status === 'active' ? 'text-green-600' :
                          user.status === 'inactive' ? 'text-gray-600' :
                          'text-yellow-600'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-600">{user.joinDate}</td>
                    <td className="px-8 py-6">
                      {user.sponsorId ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                          {user.sponsorId}
                        </span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105" onClick={() => handleView(user)}>
                          👁️
                        </button>
                        <button className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105" onClick={() => handleEdit(user)}>
                          ✏️
                        </button>
                        <button className="p-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105" onClick={() => handleDelete(user)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer" onClick={handleAdd}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">➕</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Add New User</h3>
            <p className="text-sm text-gray-600">Create a new user account</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer" onClick={handleAnalytics}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">User Analytics</h3>
            <p className="text-sm text-gray-600">View user statistics</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer" onClick={handleExport}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📤</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Export Data</h3>
            <p className="text-sm text-gray-600">Export user data</p>
          </div>
        </div>
      </div>

      {/* Modals for view, edit, add, delete confirmation (simple implementation) */}
      {showViewModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white p-8 rounded-2xl shadow-xl"><h2 className="font-bold mb-4">User Details</h2><pre>{JSON.stringify(selectedUser, null, 2)}</pre><button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={()=>setShowViewModal(false)}>Close</button></div></div>}
      {showEditModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white p-8 rounded-2xl shadow-xl"><h2 className="font-bold mb-4">Edit User (simulated)</h2><pre>{JSON.stringify(selectedUser, null, 2)}</pre><button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={()=>setShowEditModal(false)}>Close</button></div></div>}
      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white p-8 rounded-2xl shadow-xl"><h2 className="font-bold mb-4">Add User (simulated)</h2><button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={()=>setShowAddModal(false)}>Close</button></div></div>}
      {showDeleteModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white p-8 rounded-2xl shadow-xl"><h2 className="font-bold mb-4">Delete User?</h2><p>Are you sure you want to delete {selectedUser?.name}?</p><div className="mt-4 flex gap-2"><button className="px-4 py-2 bg-red-500 text-white rounded" onClick={confirmDelete}>Delete</button><button className="px-4 py-2 bg-gray-300 rounded" onClick={()=>setShowDeleteModal(false)}>Cancel</button></div></div></div>}
    </div>
  );
};

export default AdminUsers; 