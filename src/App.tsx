import React, { useState, useEffect } from 'react';
import { ProjectCreator, Project } from './ProjectCreator';
import { User, AccountManager } from './AccountManager';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: ''
  });

  const projectService = new ProjectCreator();
  const accountManager = new AccountManager();

  useEffect(() => {
    const storedProjects = projectService.getAllProjects();
    setProjects(storedProjects);
  }, []); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId !== null) {
      projectService.updateProject({ ...formData, id: editingId });
      setEditingId(null);
    } else {
      projectService.addProject({ ...formData, id: Date.now() });
    }
    setFormData({ id: '', name: '', description: '' });
    setProjects(projectService.getAllProjects());
  };

  const handleEdit = (id: number) => {
    const projectToEdit = projectService.getProjectById(id);
    if (projectToEdit) {
      setFormData({ id: String(projectToEdit.id), name: projectToEdit.name, description: projectToEdit.description });
      setEditingId(projectToEdit.id);
    }
  };

  const handleDelete = (id: number) => {
    projectService.deleteProject(id);
    setProjects(projectService.getAllProjects());
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = parseInt(e.target.value);
    accountManager.switchUser(selectedUserId);
    setProjects(projectService.getAllProjects());
  };

  return (
    <div className="App">
      <h1>Project Manager</h1>
      <form>
        <label>
          Select User:
          <select onChange={handleUserChange}>
            {accountManager.getUsers().map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </label>
      </form>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange} required />
        </label>
        <button type="submit">{editingId !== null ? 'Update' : 'Add'} Project</button>
      </form>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <div>
              <p>{project.id}</p>
              <strong>{project.name}</strong>
              <p>{project.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(project.id)}>Edit</button>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
