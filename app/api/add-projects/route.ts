import { NextResponse } from 'next/server';
import { Project } from '../get-projects/get-all-projects';
import { addProject } from './add-project';

// Endpoint to create a new project
export async function POST(request: Request) {
  try {
    const project: Project = await request.json(); // Parse the incoming request body
    const { success, projectId, error } = await addProject(project);

    if (success) {
      return NextResponse.json({ projectId: projectId }, { status: 201 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
