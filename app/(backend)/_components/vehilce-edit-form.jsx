"use client";

import { upload } from "@imagekit/next";
import { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useRouter } from "next/navigation";

const MAX_IMAGES = 15;
const FEATURES = [
  "Air Conditioner",
  "Power Steering",
  "Driver Airbag",
  "Power Windows",
  "Leather Seats",
];

export function VehicleEditForm({ vehicle }) {
  const router = useRouter();

  const [form, setForm] = useState({
    brand: vehicle.brand ?? "",
    model: vehicle.model ?? "",
    ownerType: vehicle.ownerType ?? "",
    modelYear: vehicle.modelYear ?? "",
    price: vehicle.price ?? "",
    kmDriven: vehicle.kmDriven ?? "",
    fuelType: vehicle.fuelType ?? "",
    transmission: vehicle.transmission ?? "",
    bodyType: vehicle.bodyType ?? "",
    color: vehicle.color ?? "",
    userType: vehicle.userType ?? "",
    location: vehicle.location ?? "",
    description: vehicle.description ?? "",
    images: (vehicle.images ?? []).map((img, idx) => ({
      id: img.fileId || crypto.randomUUID(),
      url: img.url,
      fileId: img.fileId,
      name: `Image ${idx + 1}`,
      isPrimary: idx === 0,
      uploading: false,
      progress: 100,
    })),
    features: vehicle.features ?? [],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  /** 🔐 ImageKit Auth */
  const authenticator = async () => {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error("Failed to get ImageKit auth");
    return res.json();
  };

  /** Dropdown Options */
  const options = {
    color: ["White", "Black", "Silver", "Gray", "Blue", "Red", "Brown"],
    brand: ["Hyundai", "Maruti Suzuki", "Tata", "Mahindra", "Kia", "Toyota"],
    fuel: ["Petrol", "Diesel", "CNG", "Electric"],
    body: ["SUV", "Sedan", "Hatchback", "MPV", "Coupe"],
    transmission: ["Manual", "Automatic", "AMT", "iMT", "CVT"],
    ownerType: [
      "First Owner",
      "Second Owner",
      "Third Owner",
      "Fourth Owner & Above",
    ],
  };

  /** Toggle features */
  const toggleFeature = (feature) =>
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));

  /** Handle file selection */
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files || []);
    uploadMultipleFiles(files);
    e.target.value = null;
  };

  /** Drag-and-drop setup */
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;

    const highlight = (add) => {
      el.classList.toggle("ring-2", add);
      el.classList.toggle("ring-blue-400", add);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      highlight(true);
    };
    const handleDragLeave = () => highlight(false);
    const handleDrop = (e) => {
      e.preventDefault();
      highlight(false);
      uploadMultipleFiles(Array.from(e.dataTransfer.files || []));
    };

    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);

    return () => {
      el.removeEventListener("dragover", handleDragOver);
      el.removeEventListener("dragleave", handleDragLeave);
      el.removeEventListener("drop", handleDrop);
    };
  }, []);

  /** Upload files to ImageKit */
  const uploadMultipleFiles = async (files) => {
    if (!files.length) return;
    const remaining = MAX_IMAGES - form.images.length;
    const toUpload = files.slice(0, remaining);

    if (toUpload.length < files.length) {
      setMessage(
        `Only uploading ${toUpload.length} images. Maximum is ${MAX_IMAGES}.`
      );
      setTimeout(() => setMessage(""), 3000);
    }

    for (const file of toUpload) {
      const id = crypto.randomUUID();
      const localUrl = URL.createObjectURL(file);

      // Add temporary placeholder
      setForm((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          { id, name: file.name, progress: 0, localUrl, uploading: true },
        ],
      }));

      try {
        const { signature, expire, token, publicKey } = await authenticator();

        const res = await upload({
          file,
          fileName: file.name,
          signature,
          expire,
          token,
          publicKey,
          onProgress: (evt) => {
            const progress = Math.round((evt.loaded / evt.total) * 100);
            setForm((prev) => ({
              ...prev,
              images: prev.images.map((img) =>
                img.id === id ? { ...img, progress } : img
              ),
            }));
          },
        });

        setForm((prev) => {
          const images = prev.images.map((img) =>
            img.id === id
              ? {
                  ...img,
                  uploading: false,
                  fileId: res.fileId,
                  url: res.url,
                  progress: 100,
                }
              : img
          );
          if (!images.some((i) => i.isPrimary) && images.length > 0) {
            images[0].isPrimary = true;
          }
          return { ...prev, images };
        });
      } catch (err) {
        console.error("Upload failed:", err);
        setMessage("Failed to upload image. Please try again.");
        setForm((prev) => ({
          ...prev,
          images: prev.images.filter((i) => i.id !== id),
        }));
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  /** Remove image */
  const removeImage = (id) => {
    setForm((prev) => {
      const images = prev.images.filter((i) => i.id !== id);
      if (!images.some((i) => i.isPrimary) && images.length > 0) {
        images[0].isPrimary = true;
      }
      return { ...prev, images };
    });
  };

  /** Set primary image */
  const setPrimary = (id) =>
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((i) => ({
        ...i,
        isPrimary: i.id === id,
      })),
    }));

  /** Handle input change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** Submit (publish or draft) */
  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    if (loading) return;

    // Validation
    if (!form.brand || !form.model || !form.ownerType) {
      setMessage(
        "Please fill in all required fields (Brand, Model, Owner Type)"
      );
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (form.images.length === 0) {
      setMessage("Please upload at least one image");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Check if any images are still uploading
    if (form.images.some((img) => img.uploading)) {
      setMessage("Please wait for all images to finish uploading");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);
    setMessage(isDraft ? "Saving draft..." : "Updating vehicle...");

    try {
      const payload = {
        ...form,
        images: form.images
          .filter((i) => i.url && i.fileId) // Only include completed uploads
          .map((i) => ({
            url: i.url,
            fileId: i.fileId,
          })),
        image:
          form.images.find((i) => i.isPrimary)?.url ||
          form.images[0]?.url ||
          "",
        published: !isDraft,
      };

      const res = await fetch(`/api/admin/truevalue/${vehicle._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update vehicle");
      }

      setMessage(
        isDraft ? "Draft saved successfully!" : "Vehicle updated successfully!"
      );

      // Redirect after success
      setTimeout(() => {
        router.push("/admin/truevalue/manage-vehicles");
        router.refresh();
      }, 1500);
    } catch (err) {
      console.error("Submit failed:", err);
      setMessage(err.message || "Failed to update vehicle. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="min-h-screen p-6 m-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
      <main className="container mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit {vehicle.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Update the vehicle details below. You can save as draft or publish
            directly.
          </p>
        </header>

        <form
          onSubmit={(e) => handleSubmit(e, false)}
          className="space-y-6"
          autoComplete="off"
        >
          {/* Vehicle Info */}
          <section className="gap-6 p-6 bg-white shadow-sm rounded-2xl">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectInput
                label="Body Type"
                name="bodyType"
                options={options.body}
                value={form.bodyType}
                onChange={handleChange}
                required
              />
              <SelectInput
                label="Make / Brand"
                name="brand"
                options={options.brand}
                value={form.brand}
                onChange={handleChange}
                required
              />
              <SelectInput
                label="Owner Type"
                name="ownerType"
                options={options.ownerType}
                value={form.ownerType}
                onChange={handleChange}
                required
              />

              <TextInput
                label="Model"
                name="model"
                placeholder="e.g. Swift / Creta"
                value={form.model}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Model Year"
                name="modelYear"
                type="number"
                placeholder="e.g. 2019"
                value={form.modelYear}
                onChange={handleChange}
              />
              <TextInput
                label="Price (₹)"
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />
              <SelectInput
                label="Fuel Type"
                name="fuelType"
                options={options.fuel}
                value={form.fuelType}
                onChange={handleChange}
                required
              />
              <SelectInput
                label="Transmission"
                name="transmission"
                options={options.transmission}
                value={form.transmission}
                onChange={handleChange}
                required
              />
              <SelectInput
                label="Color"
                name="color"
                options={options.color}
                value={form.color}
                onChange={handleChange}
              />
              <TextInput
                label="Location"
                name="location"
                placeholder="Transaction Location"
                value={form.location}
                onChange={handleChange}
              />
              <TextInput
                label="KM Driven"
                name="kmDriven"
                type="number"
                placeholder="Mileage / Kms"
                value={form.kmDriven}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Upload & Features */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Upload */}
            <div className="p-6 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-3 font-semibold text-gray-700">
                Upload Images
              </h3>

              {form.images.length < MAX_IMAGES && (
                <div
                  ref={dropRef}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-6 mb-4 transition border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <LuImagePlus className="h-7 w-7" />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag & Drop or Click to Upload
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              )}

              <ImageGrid
                images={form.images}
                removeImage={removeImage}
                setPrimary={setPrimary}
              />

              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 font-medium text-white rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Updating..." : "Update Listing"}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={loading}
                    className="px-5 py-2 font-medium text-blue-600 bg-white border border-blue-200 rounded-lg shadow-sm hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Saving..." : "Save as Draft"}
                  </button>
                </div>

                <span className="text-sm text-gray-500">
                  Images: {form.images.length}/{MAX_IMAGES}
                </span>
              </div>
            </div>

            {/* Features */}
            <aside className="p-6 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-4 font-semibold text-gray-700">
                Accessories & Features
              </h3>
              <div className="flex flex-wrap gap-3">
                {FEATURES.map((f) => {
                  const isSelected = form.features.includes(f);
                  return (
                    <label
                      key={f}
                      className="flex items-center px-3 py-2 text-gray-700 transition bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleFeature(f)}
                        className="mr-2 accent-blue-600"
                      />
                      {f}
                    </label>
                  );
                })}
              </div>

              <label className="block mt-6 text-sm text-gray-600">
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Add more details about your vehicle..."
                  rows={5}
                  className="w-full p-3 mt-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-200"
                />
              </label>
            </aside>
          </section>

          {message && (
            <div
              className={`p-3 text-sm rounded ${
                message.includes("success")
                  ? "bg-green-600 text-white"
                  : message.includes("Failed") || message.includes("Please")
                  ? "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

/** --- Small Input Components --- */
const TextInput = ({ label, ...props }) => (
  <label className="flex flex-col">
    <span className="text-sm font-medium text-gray-600">
      {label} {props.required && <span className="text-red-500">*</span>}
    </span>
    <input
      {...props}
      className="p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
    />
  </label>
);

const SelectInput = ({ label, options, ...props }) => (
  <label className="flex flex-col">
    <span className="text-sm font-medium text-gray-600">
      {label} {props.required && <span className="text-red-500">*</span>}
    </span>
    <select
      {...props}
      className="p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);

const ImageGrid = ({ images, removeImage, setPrimary }) => (
  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
    {images.length === 0 ? (
      <div className="col-span-3 p-6 text-sm text-center text-gray-400 border rounded-lg sm:col-span-4">
        No images uploaded yet.
      </div>
    ) : (
      images.map((img, index) => (
        <div
          key={index}
          className={`relative rounded-lg overflow-hidden border ${
            img.isPrimary ? "ring-2 ring-blue-500" : "border-gray-200"
          }`}
        >
          <img
            src={img.url || img.localUrl}
            alt={img.name}
            className="object-cover w-full h-28"
          />
          {img.uploading && (
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700 bg-white/90">
              {img.progress}%
            </div>
          )}
          {!img.uploading && (
            <button
              type="button"
              onClick={() => removeImage(img.id)}
              className="absolute p-1 text-lg font-bold text-gray-600 transition bg-white rounded-full shadow hover:bg-red-50 hover:text-red-600 top-1 right-1"
            >
              ×
            </button>
          )}
          <div className="flex items-center justify-between px-2 py-1 text-xs bg-white/90">
            <button
              type="button"
              onClick={() => setPrimary(img.id)}
              disabled={img.uploading}
              className={`px-2 py-1 rounded transition ${
                img.isPrimary
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } disabled:opacity-50`}
            >
              {img.isPrimary ? "Primary" : "Set"}
            </button>
            <span className="truncate max-w-[60px]" title={img.name}>
              {img.name}
            </span>
          </div>
        </div>
      ))
    )}
  </div>
);
