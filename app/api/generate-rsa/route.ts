
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import pool from '@app/mysql-database/database';
import { NextResponse } from 'next/server';

const createTableQuery = `
CREATE TABLE IF NOT EXISTS RSAKeys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    publicKey TEXT NOT NULL,
    privateKey TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function createTable() {
    await pool.query(createTableQuery);
}

async function generateAndStoreRSAKeyPair() {
    // Check if there's already a key in the database
    const [existingKeys] : any = await pool.query('SELECT COUNT(*) AS count FROM RSAKeys');

    // If a key already exists, log the message and return
    if (existingKeys[0].count > 0) {
        console.log("🔒 RSA key pair already exists in the database.");
        return; // Exit the function if a key already exists
    }

    // Proceed to generate a new RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 512, // Very weak key size
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    // Insert the new key pair into the database
    const [result] = await pool.query(
        'INSERT INTO RSAKeys (publicKey, privateKey) VALUES (?, ?)',
        [publicKey, privateKey]
    );

    console.log("✅ RSA key pair generated and stored with ID:", result);
    return result; // Return the result for further use if needed
}


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("🔄 Creating RSAKeys table if it doesn't exist...");
        await createTable();
        console.log("✅ RSAKeys table created or already exists.");

        console.log("🔄 Generating and storing RSA key pair...");
        const result = await generateAndStoreRSAKeyPair();
        console.log("✅ RSA key pair is now in the database");

        return NextResponse.json({ message: 'RSA table created and key seeded successfully.' }, { status: 200 });
    } catch (error) {
        console.error("❌ Error generating or storing RSA key pair:", error);
        res.status(500).json({ message: 'Failed to generate RSA keys', error: error });
    }
}
