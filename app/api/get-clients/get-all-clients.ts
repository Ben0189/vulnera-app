
import pool from '@app/mysql-database/database';
import { Client } from '@models/entity/Client';

// Function to get all clients from the database
export async function getAllClients() {
    try {
      // Fetch all clients from the Clients table
      const [rows] = await pool.query(`SELECT * FROM Clients;`);
      return { success: true, clients: rows as Client[] };
    } catch (error) {
      return { success: false, error: error };
    }
  }