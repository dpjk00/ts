export interface Project {
  id: number;
  name: string;
  description: string;
}

export class ProjectCreator {
  private projects: Project[];

  constructor() {
    const storedProjects = localStorage.getItem('projects');
    this.projects = storedProjects ? JSON.parse(storedProjects) : [];
  }

  addProject(project: Project): void {
    this.projects.push(project);
    this.saveProjects();
  }

  getAllProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  updateProject(updatedProject: Project): void {
    const index = this.projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
      this.saveProjects();
    }
  }

  deleteProject(id: number): void {
    this.projects = this.projects.filter(project => project.id !== id);
    this.saveProjects();
  }

  saveProjects(): void {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
}