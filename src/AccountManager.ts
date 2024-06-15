export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "devops" | "developer"; // Dodanie roli użytkownika
}

export class AccountManager {
  private loggedInUser: User | null;
  private users: User[];

  constructor() {
    this.loggedInUser = null;
    this.users = [
      { id: 1, username: "admin", email: "admin@example.com", role: "admin" },
      { id: 2, username: "devops", email: "devops@example.com", role: "devops" },
      { id: 3, username: "developer", email: "developer@example.com", role: "developer" }
    ];
  }

  login(username: string, email: string): void {
    const user = this.users.find(user => user.username === username && user.email === email);
    if (user) {
      this.loggedInUser = user;
    } else {
      console.log("Nieprawidłowe dane logowania");
    }
  }

  logout(): void {
    this.loggedInUser = null;
  }

  getUsers(): User[] {
    return this.users;
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  switchUser(userId: number): void {
    const user = this.users.find(user => user.id === userId);
    if (user) {
      this.loggedInUser = user;
    } else {
      console.log(`Użytkownik o ID ${userId} nie istnieje.`);
    }
  }
}
