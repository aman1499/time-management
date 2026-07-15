import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { createTimesheet, listTimesheets } from "@/lib/timesheets";
import { TimesheetInput } from "@/lib/types";

async function requireSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function GET() {
  const session = await requireSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ data: listTimesheets() });
}

export async function POST(request: Request) {
  const session = await requireSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let payload: TimesheetInput;
  try {
    payload = (await request.json()) as TimesheetInput;
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const result = createTimesheet(payload);

  if (result.errors) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }

  return NextResponse.json({ data: result.entry }, { status: 201 });
}
