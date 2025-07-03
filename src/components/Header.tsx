import { Plus, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">Work Items</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-1.5 rounded-md bg-gray-800 text-white placeholder-gray-400"
          />
          <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="mr-2" size={18} />
          New Task
        </button>
      </div>
    </header>
  );
};

export default Header;
