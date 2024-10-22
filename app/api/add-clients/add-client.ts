import pool from '@app/mysql-database/database';
import { Client } from '@models/entity/Client';

// Function to create a new client
export async function addClient(client: Client) {
    try {
        // Insert the new client into the Clients table
        const [result] = await pool.query(
            'INSERT INTO Clients (Name, Email, Contact, Revenue, CreditCardNumber) VALUES (?, ?, ?, ?, ?)',
            [client.name, client.email, client.contact, client.revenue, client.creditCardNumber]
        );
        return { success: true, clientId: result };
    } catch (error) {
        return { success: false, error: error };
    }
}
