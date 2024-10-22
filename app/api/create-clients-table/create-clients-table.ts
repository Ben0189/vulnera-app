import pool from '@app/mysql-database/database';
import { Client } from '@models/entity/Client';

// Payload data for seeding
const clientList: Client[] = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      contact: 1234567890,
      revenue: 10000,
      creditCardNumber: 1234567890123456, // Example credit card number
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      contact: 9876543210,
      revenue: 15000,
      creditCardNumber: 6543210987654321, // Example credit card number
    },
];

// Function to create the client table and seed it with data
export async function createClientTable() {
    try {
        // Create the client table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Clients (
                Id INT AUTO_INCREMENT PRIMARY KEY,
                Name VARCHAR(255),
                Email VARCHAR(255),
                Contact BIGINT,
                Revenue BIGINT,
                CreditCardNumber BIGINT
            );
        `);

        // Seed the client table with data
        for (const client of clientList) {
            await pool.query(
                `INSERT INTO Clients (Name, Email, Contact, Revenue, CreditCardNumber) VALUES (?, ?, ?, ?, ?)`,
                [client.name, client.email, client.contact, client.revenue, client.creditCardNumber]
            );
        }

        return { success: true, message: 'Client table created and seeded successfully.' };
    } catch (error) {
        return { success: false, error: error };
    }
}
