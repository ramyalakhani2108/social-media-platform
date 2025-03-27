import AdminLayout from '../../components/admin/AdminLayout';
import { FiMessageSquare, FiEye, FiTrash, FiEdit } from 'react-icons/fi';

const PostsManagement = () => {
  const posts = [
    {
      id: 1,
      title: 'Sample Post 1',
      author: 'john_doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      comments: 15,
      views: 250,
      status: 'published',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      title: 'Sample Post 2',
      author: 'jane_smith',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: 8,
      views: 120,
      status: 'draft',
      createdAt: '2024-01-16',
    },
  ];

  const handleStatusChange = (postId: number, status: string) => {
    // Implement status change logic
    console.log(`Changing status for post ${postId} to ${status}`);
  };

  const handleDelete = (postId: number) => {
    // Implement delete logic
    console.log(`Deleting post ${postId}`);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Post Management</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Add New Post
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Comments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Views
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
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiMessageSquare className="mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {post.author}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {post.comments}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {post.views}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={post.status}
                    onChange={(e) => handleStatusChange(post.id, e.target.value)}
                    className="text-sm rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {post.createdAt}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-2"
                    onClick={() => {
                      // Implement edit logic
                      console.log(`Editing post ${post.id}`);
                    }}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    onClick={() => handleDelete(post.id)}
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

export default PostsManagement;
