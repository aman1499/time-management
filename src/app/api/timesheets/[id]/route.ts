import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { deleteTimesheet, updateTimesheet } from "@/lib/timesheets";
import { TimesheetInput } from "@/lib/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function requireSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  let payload: TimesheetInput;
  try {
    payload = (await request.json()) as TimesheetInput;
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const result = updateTimesheet(id, payload);

  if (result.notFound) {
    return NextResponse.json({ message: "Timesheet not found" }, { status: 404 });
  }

  if (result.errors) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }

  return NextResponse.json({ data: result.entry });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await requireSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = deleteTimesheet(id);

  if (!deleted) {
    return NextResponse.json({ message: "Timesheet not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
