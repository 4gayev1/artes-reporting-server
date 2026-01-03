import { useState } from "react";
import { addReport } from "../api";

export default function AddReportModal({
  onClose,
  onAdd,
  projects,
  types,
  darkMode,
}) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file)
      return alert("All fields are required!");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("project", project);
    formData.append("type", type);
    await addReport(formData);
    onAdd();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} w-full max-w-md p-6 rounded-xl shadow-2xl relative transition-colors duration-500`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-5 text-center">
          Add New Report
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Report Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300
              ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"}`}
          />

          {/* Project */}
          <input
            list="projects"
            placeholder="Project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className={`w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300
              ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"}`}
          />
          <datalist id="projects">
            {projects.map((p) => (
              <option key={Object.keys(p)} value={Object.values(p)} />
            ))}
          </datalist>

          {/* Type */}
          <input
            list="types"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300
              ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"}`}
          />
          <datalist id="types">
            {types.map((t) => (
              <option key={Object.keys(t)} value={Object.values(t)} />
            ))}
          </datalist>

          {/* File Upload */}
          <label
            className={`w-full p-3 rounded-lg border border-dashed cursor-pointer flex justify-between items-center
            ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600" : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100"} transition-colors`}
          >
            <span>{file ? file.name : "Choose file..."}</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2 rounded-lg font-medium transition-colors duration-300
                ${darkMode ? "bg-gray-600 hover:bg-gray-500 text-gray-100" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors duration-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
