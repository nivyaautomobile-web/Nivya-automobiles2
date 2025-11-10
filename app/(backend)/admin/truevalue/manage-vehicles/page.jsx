"use client";

import { ConfirmPopup } from "@/app/components/confirm-popup";
import { PenBox, PlusCircle, Trash, Search, Filter } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaRupeeSign, FaCar } from "react-icons/fa";
import PostVehicle from "../post-vehicle/page";

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  /** Fetch all vehicles */
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/truevalue", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch vehicles");
      setVehicles(Array.isArray(data.vehicles) ? data.vehicles : []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const formatNumber = (num) =>
    new Intl.NumberFormat("en-IN").format(Number(num));

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/truevalue/${selectedId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete vehicle");
      }
      toast.success("Vehicle deleted successfully");
      setIsOpen(false);
      setSelectedId(null);
      fetchVehicles();
    } catch (error) {
      toast.error(error.message || "Failed to delete vehicle");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <p className="ml-3 font-medium text-blue-600">Loading vehicles...</p>
      </div>
    );

  if (error)
    return (
      <p className="mt-10 font-semibold text-center text-red-500">
        Error: {error}
      </p>
    );

  return (
    <div className="min-h-[calc(100vh-25px)] bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 rounded-3xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text">
            Manage TrueValue Vehicles
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage, edit, and publish your pre-owned car listings.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white transition-all shadow-lg rounded-xl sm:w-auto w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-2xl"
        >
          <PlusCircle className="w-4 h-4" />
          {showAddForm ? "Close Form" : "Add Vehicle"}
        </motion.button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col items-center justify-between gap-3 mb-6 sm:flex-row">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by vehicle name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-gray-700 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md sm:w-auto">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 mb-6 border border-gray-100 shadow-xl sm:p-6 bg-white/90 rounded-2xl"
          >
            <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
              <FaCar className="text-blue-600" /> Add New Vehicle
            </h2>
            <PostVehicle
              onVehicleAdded={() => {
                fetchVehicles();
                setShowAddForm(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Responsive Table for Desktop */}
      <div className="hidden overflow-x-auto bg-white border border-gray-100 shadow-xl md:block rounded-2xl">
        {filteredVehicles.length === 0 ? (
          <p className="p-8 font-medium text-center text-gray-500">
            No vehicles found.
          </p>
        ) : (
          <table className="w-full text-sm text-gray-700">
            <thead className="text-white bg-gradient-to-r from-blue-700 to-indigo-600">
              <tr>
                <th className="px-6 py-3 font-semibold text-left">#</th>
                <th className="px-6 py-3 font-semibold text-left">Photos</th>
                <th className="px-6 py-3 font-semibold text-left">Name</th>
                <th className="px-6 py-3 font-semibold text-left">Price</th>
                <th className="px-6 py-3 font-semibold text-left">Fuel</th>
                <th className="px-6 py-3 font-semibold text-left">KMs</th>
                <th className="px-6 py-3 font-semibold text-left">
                  Transmission
                </th>
                <th className="px-6 py-3 font-semibold text-left">Status</th>
                <th className="px-6 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="transition-all border-b border-gray-100 hover:bg-blue-50/50"
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {item.images?.length ? (
                        item.images.slice(0, 2).map((img, idx) => (
                          <div
                            key={idx}
                            className="relative overflow-hidden border border-gray-200 rounded-lg w-14 h-14"
                          >
                            <Image
                              src={img.url}
                              alt={item.name}
                              fill
                              sizes="56px"
                              className="object-cover transition-transform hover:scale-110"
                            />
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold">{item.name}</td>
                  <td className="px-6 py-4 font-semibold text-blue-700">
                    <div className="flex items-center">
                      <FaRupeeSign className="mr-1 text-blue-500" />
                      {formatNumber(item.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.fuelType}</td>
                  <td className="px-6 py-4">
                    {formatNumber(item.kmDriven)} km
                  </td>
                  <td className="px-6 py-4">{item.transmission}</td>

                  <td className="px-6 py-4">
                    {item.published ? (
                      <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={() =>
                          router.push(
                            `/admin/truevalue/manage-vehicles/edit/${item._id}`
                          )
                        }
                      >
                        <PenBox className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                        disabled={isDeleting}
                        onClick={() => {
                          setSelectedId(item._id);
                          setIsOpen(true);
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 📱 Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredVehicles.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.fuelType} • {item.transmission}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 text-white bg-blue-600 rounded-md"
                  onClick={() =>
                    router.push(
                      `/admin/truevalue/manage-vehicles/edit/${item._id}`
                    )
                  }
                >
                  <PenBox className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-white bg-red-600 rounded-md"
                  onClick={() => {
                    setSelectedId(item._id);
                    setIsOpen(true);
                  }}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex gap-2 mt-3">
              {item.images?.length ? (
                item.images.slice(0, 2).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-20 overflow-hidden border border-gray-200 rounded-lg"
                  >
                    <Image
                      src={img.url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <span className="text-xs text-gray-400">No Image</span>
              )}
            </div>

            {/* Price & Info */}
            <div className="mt-3">
              <p className="flex items-center font-semibold text-blue-700">
                <FaRupeeSign className="mr-1 text-blue-500" />
                {formatNumber(item.price)}
              </p>
              <p className="text-sm text-gray-500">
                {formatNumber(item.kmDriven)} km
              </p>
              <p className="mt-1 text-xs">
                {item.published ? (
                  <span className="font-medium text-green-600">Published</span>
                ) : (
                  <span className="font-medium text-yellow-600">Draft</span>
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confirm Delete Popup */}
      <ConfirmPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClick={handleDelete}
        loading={isDeleting}
      />
    </div>
  );
}
