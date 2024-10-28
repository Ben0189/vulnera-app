import pool from '@app/mysql-database/database';
export interface Project  {
    id: number;
    name: string;
    budget: number;
    companyName: string;
    description : string;
}

// Function to get all clients from the database
export async function getAllProject(){
  try {
    // Fetch all clients from the Clients table
    //TODO: Investigate if typescafety can be apply
    const [rows] = await pool.query('SELECT * FROM projects');
    return { success: true, projects: rows as Project[] };
  } catch (error) {
    return { success: false, error: error };
  }
}