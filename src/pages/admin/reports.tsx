import AdminLayout from '../../components/admin/AdminLayout';
import { FiFlag, FiUser, FiMessageSquare, FiTrash } from 'react-icons/fi';

const ReportsManagement = () => {
  const reports = [
    {
      id: 1,
      type: 'post',
      reportedBy: 'john_doe',
      reportedContent: 'Inappropriate content',
      status: 'pending',
      createdAt: '2024-01-15',
      contentId: 123,
      contentTitle: 'Sample Post',
    },
    {
      id: 2,
      type: 'comment',
      reportedBy: 'jane_smith',
      reportedContent: 'Harassment',
      status: 'resolved',
      createdAt: '2024-01-16',
      contentId: 456,
      contentTitle: 'Sample Comment',
    },
  ];

  const handleStatusChange = (reportId: number, status: string) => {
    // Implement status change logic
    console.log(`Changing status for report ${reportId} to ${status}`);
  };

  const handleDelete = (reportId: number) => {
    // Implement delete logic
    console.log(`Deleting report ${reportId}`);
  };

  const handleViewContent = (contentId: number, type: string) => {
    // Implement view content logic
    console.log(`Viewing ${type} ${contentId}`);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Reports Management</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Export Reports
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Generate Report
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Reported By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {report.type === 'post' ? (
                      <FiMessageSquare className="mr-2" />
                    ) : (
                      <FiFlag className="mr-2" />
                    )}
                    <span className="text-sm text-gray-900 dark:text-white">
                      {report.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {report.reportedBy}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewContent(report.contentId, report.type)}
                    className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                  >
                    View {report.type}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {report.reportedContent}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusChange(report.id, e.target.value)}
                    className="text-sm rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="ignored">Ignored</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {report.createdAt}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    onClick={() => handleDelete(report.id)}
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ReportsManagement;
