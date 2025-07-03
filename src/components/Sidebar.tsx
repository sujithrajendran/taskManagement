const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-full p-4">
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <ul className="space-y-4">
        <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">Dashboard</li>
        <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">Tasks</li>
        <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">Reports</li>
        <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
