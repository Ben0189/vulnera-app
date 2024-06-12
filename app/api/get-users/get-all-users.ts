import pool from '@app/mysql-database/database';
import { RowDataPacket } from 'mysql2';

// Define the Client type (ensure it matches your table structure)
interface Client extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  // Add other fields as necessary
}

// Function to get all clients from the database
export async function getAllUsers() {
  try {
    // Fetch all clients from the Clients table
    const [clients] = await pool.query<Client[]>('SELECT * FROM Users;');
    return { success: true, clients };
  } catch (error) {
    return { success: false, error: error };
  }
}
