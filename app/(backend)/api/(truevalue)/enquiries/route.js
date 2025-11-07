import { ConnectDB } from "@/lib/config/db";
import TruevalueEnquiry from "@/lib/models/truevalue-enquiry";
import { NextResponse } from "next/server";

//GET /api/truevalue-enquiry
export async function GET() {
  try {
    const enquiries = await TruevalueEnquiry.find().sort({
      createdAt: -1,
    });
    return NextResponse.json(
      { success: true, data: enquiries },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching finance enquiries:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/truevalue-enquiry
export async function POST(req) {
  try {
    await ConnectDB();

    const { name, email, number, message, formType } = await req.json();

    // Basic validation
    if (!name?.trim() || !number?.toString().trim()) {
      return NextResponse.json(
        { error: "Name and number are required fields." },
        { status: 400 }
      );
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Create new enquiry
    const newEntry = await TruevalueEnquiry.create({
      name: name.trim(),
      email: email?.trim() || "",
      number,
      message: message?.trim() || "",
      formType: formType?.trim() || "sell",
    });

    return NextResponse.json(
      { success: true, data: newEntry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating TruevalueEnquiry:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
