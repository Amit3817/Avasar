const AdminContacts = () => {
  const contacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', subject: 'Investment Inquiry', message: 'I would like to know more about your investment opportunities.', status: 'new', date: '2024-02-15 10:30 AM' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 98765 43211', subject: 'Support Request', message: 'I need help with my account setup and investment process.', status: 'in-progress', date: '2024-02-14 02:15 PM' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+91 98765 43212', subject: 'Partnership Proposal', message: 'I am interested in discussing a potential partnership opportunity.', status: 'completed', date: '2024-02-13 09:45 AM' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+91 98765 43213', subject: 'General Question', message: 'What are the minimum investment requirements?', status: 'new', date: '2024-02-12 04:20 PM' },
    { id: 5, name: 'David Brown', email: 'david@example.com', phone: '+91 98765 43214', subject: 'Technical Issue', message: 'I am experiencing issues with the platform login.', status: 'in-progress', date: '2024-02-11 11:30 AM' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'from-blue-500 to-indigo-500';
      case 'in-progress': return 'from-yellow-500 to-orange-500';
      case 'completed': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return '🆕';
      case 'in-progress': return '⏳';
      case 'completed': return '✅';
      default: return '❓';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-4">📧</span>
            Contact Management
          </h1>
          <p className="text-lg text-gray-600">
            Manage contact form submissions, respond to inquiries, and track customer support requests.
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
                <span className="text-2xl">📧</span>
              </div>
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{contacts.length}</h3>
            <p className="text-gray-600 font-medium">Total Contacts</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🆕</span>
              </div>
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                New
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{contacts.filter(c => c.status === 'new').length}</h3>
            <p className="text-gray-600 font-medium">New Messages</p>
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
                In Progress
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{contacts.filter(c => c.status === 'in-progress').length}</h3>
            <p className="text-gray-600 font-medium">In Progress</p>
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
                Completed
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{contacts.filter(c => c.status === 'completed').length}</h3>
            <p className="text-gray-600 font-medium">Completed</p>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        <div className="relative z-10">
          <div className="p-8 border-b border-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="mr-3">📋</span>
              Contact Messages
            </h2>
            <p className="text-gray-600">View and manage all contact form submissions</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-8 py-6 text-left font-bold text-lg">Contact</th>
                  <th className="px-8 py-6 text-left font-bold text-lg">Subject</th>
                  <th className="px-8 py-6 text-left font-bold text-lg">Status</th>
                  <th className="px-8 py-6 text-left font-bold text-lg">Date</th>
                  <th className="px-8 py-6 text-left font-bold text-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-600">{contact.email}</div>
                          <div className="text-sm text-gray-500">{contact.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <div className="font-bold text-gray-900">{contact.subject}</div>
                        <div className="text-sm text-gray-600 truncate max-w-xs">{contact.message}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 bg-gradient-to-r ${getStatusColor(contact.status)} rounded-xl flex items-center justify-center mr-3 shadow-lg`}>
                          <span className="text-white text-sm">{getStatusIcon(contact.status)}</span>
                        </div>
                        <span className={`font-bold capitalize ${
                          contact.status === 'new' ? 'text-blue-600' :
                          contact.status === 'in-progress' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {contact.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-600">{contact.date}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          👁️
                        </button>
                        <button className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          ✉️
                        </button>
                        <button className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          ✏️
                        </button>
                        <button className="p-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
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
        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📤</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Send Response</h3>
            <p className="text-sm text-gray-600">Reply to contact messages</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Contact Analytics</h3>
            <p className="text-sm text-gray-600">View contact statistics</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📥</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Export Data</h3>
            <p className="text-sm text-gray-600">Export contact data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContacts; 