// ✅ API route: /api/admin/truevalue/[id]
// Admin-only — Handles GET, PUT, DELETE for individual vehicles

import { NextResponse } from "next/server";
import Rajesh from "@/lib/models/trueSchema";
import { ConnectDB } from "@/lib/config/db";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
  try {
    await ConnectDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid vehicle ID" },
        { status: 400 }
      );
    }

    const vehicle = await Rajesh.findById(id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vehicle }, { status: 200 });
  } catch (err) {
    console.error("GET /api/admin/truevalue/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch vehicle." },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    await ConnectDB();
    const { id } = params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid vehicle ID" },
        { status: 400 }
      );
    }

    const requiredFields = ["brand", "model", "ownerType"];
    const missing = requiredFields.filter((f) => !body[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required field(s): ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const vehicle = await Rajesh.findById(id);
    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    const formData = {
      name: `${body.brand?.trim()} ${body.model?.trim()}`,
      brand: body.brand?.trim(),
      model: body.model?.trim(),
      ownerType: body.ownerType?.trim(),
      fuelType: body.fuelType?.trim() || "Unknown",
      modelYear: body.modelYear ? Number(body.modelYear) : null,
      price: Number(body.price) || 0,
      kmDriven: Number(body.kmDriven) || 0,
      transmission: body.transmission?.trim() || "Manual",
      bodyType: body.bodyType?.trim() || "Other",
      color: body.color?.trim() || "Unspecified",
      userType: body.userType?.trim() || "Dealer",
      location: body.location?.trim() || "Unknown",
      images: Array.isArray(body.images)
        ? body.images
            .filter((img) => img?.url)
            .map((img) => ({
              url: img.url.trim(),
              fileId: img.fileId || null,
            }))
        : [],
      published: body.published ?? true,
      features: Array.isArray(body.features) ? body.features : [],
      description: body.description?.trim() || "",
    };

    const updatedVehicle = await Rajesh.findByIdAndUpdate(id, formData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Vehicle updated successfully",
        data: updatedVehicle,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Vehicle update failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update vehicle" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await ConnectDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid vehicle ID" },
        { status: 400 }
      );
    }

    const vehicle = await Rajesh.findById(id);
    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    // ✅ Construct base URL safely (for Vercel)
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL?.startsWith("http")
        ? process.env.NEXT_PUBLIC_BASE_URL
        : `https://${process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000"}`;

    // ✅ Delete all images from ImageKit safely
    if (vehicle.images?.length > 0) {
      try {
        await Promise.all(
          vehicle.images.map(async (image) => {
            try {
              const res = await fetch(`${baseUrl}/api/imagekit/${image.fileId}`, {
                method: "DELETE",
              });

              if (!res.ok) {
                console.error(`❌ Failed to delete image: ${image.fileId}`);
              }
            } catch (error) {
              console.error(`⚠️ Error deleting image ${image.fileId}:`, error);
            }
          })
        );
        console.log("✅ All images deleted from ImageKit");
      } catch (err) {
        console.error("❌ ImageKit deletion error:", err);
        return NextResponse.json(
          { success: false, error: "Failed to delete images" },
          { status: 500 }
        );
      }
    }

    // ✅ Delete the vehicle record
    await Rajesh.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Vehicle deleted successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/admin/truevalue/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete vehicle." },
      { status: 500 }
    );
  }
};
