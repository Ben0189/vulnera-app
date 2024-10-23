import pool from '@app/mysql-database/database';
import { Client } from '@models/entity/Client';
import { encryptSymmetric } from '../add-clients/add-client';
import crypto from 'crypto';

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
        // Create the client table with encryption-related fields
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Clients (
                Id INT AUTO_INCREMENT PRIMARY KEY,
                Name VARCHAR(255),
                Email VARCHAR(255),
                Contact BIGINT,
                Revenue BIGINT,
                CreditCardNumber TEXT,  -- Store ciphertext (encrypted credit card number)
                IV VARCHAR(24),          -- Store Initialization Vector (IV)
                AuthTag VARCHAR(24)      -- Store Authentication Tag
            );
        `);

        // Seed the client table with encrypted data
        for (const client of clientList) {
            // Encrypt the credit card number before seeding
            const encryptionKey = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('base64');
            const { ciphertext, iv, tag } = encryptSymmetric(encryptionKey, client.creditCardNumber.toString());

            // Insert the client with encrypted credit card number, IV, and AuthTag
            await pool.query(
                `INSERT INTO Clients (Name, Email, Contact, Revenue, CreditCardNumber, IV, AuthTag) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [client.name, client.email, client.contact, client.revenue, ciphertext, iv, tag.toString('base64')]
            );
        }

        return { success: true, message: 'Client table created and seeded successfully.' };
    } catch (error) {
        return { success: false, error: error };
    }
}