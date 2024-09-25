import { Project } from '../get-projects/get-all-projects';
import pool from '@app/mysql-database/database';

// Payload data for seeding
const projectList: Project[] = [
  {
    id: 123,
    name: 'Project Alpha',
    budget: 100000,
    companyName: 'Company A',
    description: 'Alpha project description',
  },
  {
    id:122,
    name: 'Project Beta',
    budget: 200000,
    companyName: 'Company B',
    description: 'Beta project description',
  },
];

// Function to create the project table and seed it with data
export async function createProjectTable() {
  try {
    // TODO: Check if the table already exists and create it if not

    // Create the project table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Projects (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255),
        Budget DECIMAL(10, 2),
        CompanyName VARCHAR(255),
        Description TEXT
      );
    `);

    // Seed the project table with data
    for (const project of projectList) {
      await pool.query(
        `INSERT INTO Projects (Name, Budget, CompanyName, Description) VALUES (?, ?, ?, ?)`,
        [project.name, project.budget, project.companyName, project.description]
      );
    }

    return { success: true, message: 'Project table created and seeded successfully.' };
  } catch (error) {
    return { success: false, error: error };
  }
}
