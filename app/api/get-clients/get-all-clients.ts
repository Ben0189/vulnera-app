import pool from '@app/mysql-database/database';
import crypto from 'crypto';

const decryptSymmetric = (key: string, ciphertext: string, iv: string, authTag: string) => {
    // Convert the base64-encoded values back to Buffers
    const ivBuffer = Buffer.from(iv, 'base64');
    const ciphertextBuffer = Buffer.from(ciphertext, 'base64');
    const authTagBuffer = Buffer.from(authTag, 'base64');

    // Create a decipher object using the same algorithm, key, and IV
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(key, 'base64') as any,
      ivBuffer as any
    );

    // Set the authentication tag
    decipher.setAuthTag(authTagBuffer as any);

    // Decrypt the ciphertext
    let decrypted = decipher.update(ciphertextBuffer as any, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; // This is the decrypted credit card number
};

// Function to get all clients from the database
export async function getAllClients() {
  try {
      // Fetch all clients from the Clients table
      const [rows] = await pool.query(`SELECT * FROM Clients;`);
      
      // Encryption key from environment variables
      const encryptionKey = process.env.ENCRYPTION_KEY

      if (!encryptionKey) {
          throw new Error('Encryption key is not available.');
      }

      // Decrypt credit card number for each client
      const decryptedClients = (rows as any[]).map(client => {

          if (!client.CreditCardNumber || !client.IV || !client.AuthTag) {
              console.warn(`Client ${client.Id} is missing encryption data.`);
              return client;  // Skip decryption if any data is missing
          }

          console.log("👋🏻 Before Decrypt = " , client.CreditCardNumber)

          const decryptedCreditCardNumber = decryptSymmetric(
              encryptionKey,
              client.CreditCardNumber,  // Ciphertext
              client.IV,                // Initialization Vector
              client.AuthTag            // Authentication Tag
          );

          console.log("👋🏻 After Decrypt = " , decryptedCreditCardNumber)

          // Return the client object with the decrypted credit card number
          return {
              ...client,
              CreditCardNumber: decryptedCreditCardNumber
          };
      });

      return { success: true, clients: decryptedClients };
  } catch (error) {
      console.error('Error fetching or decrypting clients:', error);
      return { success: false, error: error };
  }
}
