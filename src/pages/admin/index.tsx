import AdminLayout from '../../components/admin/AdminLayout';
import { FiUsers, FiMessageSquare, FiFlag, FiPieChart } from 'react-icons/fi';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      icon: <FiUsers className="w-8 h-8" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Posts',
      value: '4,567',
      icon: <FiMessageSquare className="w-8 h-8" />,
      color: 'bg-green-500',
    },
    {
      title: 'Reports',
      value: '234',
      icon: <FiFlag className="w-8 h-8" />,
      color: 'bg-red-500',
    },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg ${stat.color} text-white`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl font-bold">{stat.value}</div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div className="text-lg font-semibold">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Latest Posts</h3>
              <button className="text-sm text-blue-500 hover:text-blue-600">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((post) => (
                <div key={post} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Post Title {post}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      User {post} • 2 hours ago
                    </p>
                  </div>
                  <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
