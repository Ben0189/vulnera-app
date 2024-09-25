
import { NextResponse } from "next/server";
import { createProjectTable } from "./create-project-table";


// Endpoint to create the client table and seed it with data
export async function POST(request: Request) {
  try {
    const result = await createProjectTable();
    if (result.success) {
      return NextResponse.json({ message: 'Project table created and seeded successfully.' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to create and seed the project table.', details: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}