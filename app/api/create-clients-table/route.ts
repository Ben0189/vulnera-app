
import { createClientTable } from "./create-clients-table";
import { NextResponse } from "next/server";


// Endpoint to create the client table and seed it with data
export async function POST(request: Request) {
  try {
    const result = await createClientTable();
    if (result.success) {
      return NextResponse.json({ message: 'Client table created and seeded successfully.' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to create and seed the client table.', details: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}