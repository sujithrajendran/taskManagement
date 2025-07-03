const tasks = [
  { id: 6630, title: 'Query is present but not working', assignedTo: 'James', state: 'New', area: 'Kea' },
  { id: 6501, title: 'Do not show percentage card without filter', assignedTo: 'Sujith', state: 'Resolved', area: 'Kea-Customer-Experience' },
  // Add more
];

const TaskTable = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <table className="w-full text-sm text-left">
        <thead className="text-gray-700 uppercase bg-gray-200">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Assigned To</th>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">Area</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{task.id}</td>
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.assignedTo}</td>
              <td className="px-4 py-2">{task.state}</td>
              <td className="px-4 py-2">{task.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
