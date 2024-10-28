import pool from '@app/mysql-database/database';
import { Client } from '@models/entity/Client';
import crypto from 'crypto';

export const encryptSymmetric = (key : string, creditCardNumber : any) => {
    const iv = crypto.randomBytes(12).toString('base64');
    const cipher = crypto.createCipheriv(
      "aes-256-gcm", 
      Buffer.from(key, 'base64') as any, 
      Buffer.from(iv, 'base64') as any
    );
    let ciphertext = cipher.update(creditCardNumber, 'utf8', 'base64');
    ciphertext += cipher.final('base64');
    const tag = cipher.getAuthTag()
    
    return { ciphertext, iv, tag }
  }

// Function to create a new client
export async function addClient(client: Client) {
    try {
        const encryptionKey = process.env.ENCRYPTION_KEY as string;

        // Encrypt the credit card number
        const { ciphertext, iv, tag } = encryptSymmetric(encryptionKey, client.creditCardNumber);

        console.log("👋🏻 Chipertext = " ,ciphertext)
        console.log("🔎IV = " ,iv)
        console.log("👌🏻Tag = " ,tag)

        // Insert the new client into the Clients table with encrypted credit card data
        const [result] = await pool.query(
            'INSERT INTO Clients (Name, Email, Contact, Revenue, CreditCardNumber, IV, AuthTag) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [client.name, client.email, client.contact, client.revenue, ciphertext, iv, tag.toString('base64')]
        );

        return { success: true, clientId: result };
    } catch (error) {

        console.log(error)
        return { success: false, error: error };
    }
}
