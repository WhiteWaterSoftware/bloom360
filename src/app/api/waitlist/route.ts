import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_WAITLIST_TABLE_ID;
  if (!pat || !baseId || !tableId) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { name, state, email, phone } = body;

  if (!name || !state || !phone) {
    return NextResponse.json(
      { error: "Name, state, and phone are required" },
      { status: 400 }
    );
  }

  const fields: Record<string, string> = {
    fld1bouPauGaqgiti: name,
    fldcV8Co14MteWqKN: state,
    fldYEPNu4bPw2OVLH: phone,
  };
  if (email) {
    fields.fldZQn0N8TNCKPwdV = email;
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Airtable error:", err);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
