import pool from "@app/mysql-database/database";
import { Project } from "../get-projects/get-all-projects";

// Function to create a new project
export async function addProject(project: Project) {
    try {
      // Insert the new project into the Projects table
      const [result] = await pool.query('INSERT INTO projects (name, budget, companyName, description) VALUES (?, ?, ?, ?)', 
                                        [project.name, project.budget, project.companyName, project.description]);
      return { success: true, projectId: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }