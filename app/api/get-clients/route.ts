import { NextResponse } from 'next/server';
import { getAllClients } from './get-all-clients';


// Endpoint to get all clients
export async function GET(request: Request) {
  try {
    const { success, clients, error } = await getAllClients();
    if (success) {
        const clientData = clients?.rows; // Extracting the rows array
      return NextResponse.json({ clientData }, { status: 200 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
