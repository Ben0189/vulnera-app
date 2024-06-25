import { NextResponse } from 'next/server';
import { getAllProject } from './get-all-projects';

// Endpoint to get all projects
export async function GET(request: Request) {
  try {
    const { success, projects, error } = await getAllProject();
    if (success) {
      return NextResponse.json({ projects: projects }, { status: 200 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
