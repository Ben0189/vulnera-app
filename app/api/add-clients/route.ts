import { NextResponse } from 'next/server';
import { Client } from '@models/entity/Client';
import { addClient } from './add-client';

// Endpoint to create a new client
export async function POST(request: Request) {
    try {
        const client: Client = await request.json(); // Parse the incoming request body
        const { success, clientId, error } = await addClient(client);

        if (success) {
            return NextResponse.json({ clientId: clientId }, { status: 201 });
        } else {
            return NextResponse.json({ error }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
