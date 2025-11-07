"use client";

import { ConfirmPopup } from "@/app/components/confirm-popup";
import { PenBox, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa";

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const router = useRouter();

  // Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/truevalue", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch vehicles");

      setVehicles(Array.isArray(data.vehicles) ? data.vehicles : []);
    } catch (err) {
      console.error("Fetch error:", err);
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
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete vehicle");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <p className="py-10 text-center">Loading vehicles...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white min-h-[calc(100vh-25px)] p-2 rounded-lg mr-2 mt-1">
      <div className="px-4 min-h-40">
        <h5 className="my-4 text-xl uppercase text-primaryBlue">
          Manage Truevalue Vehicles
        </h5>

        {vehicles.length === 0 ? (
          <p className="text-gray-500">No vehicles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr className="text-sm font-semibold text-gray-700">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Photos</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Fuel</th>
                  <th className="px-4 py-2 border">KMs</th>
                  <th className="px-4 py-2 border">Transmission</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {vehicles.map((item, index) => (
                  <tr
                    key={item._id}
                    className="transition border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 text-center border">
                      {index + 1}
                    </td>

                    <td className="px-4 py-2 text-center border">
                      <div className="flex items-center flex-wrap gap-2">
                        {item.images?.length > 0 ? (
                          item.images.map((img) => (
                            <div
                              key={img._id}
                              className="aspect-square relative border border-gray-200 rounded w-16 h-16"
                            >
                              <Image
                                src={img.url}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No Image
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-2 text-center border">
                      {item.name}
                    </td>

                    <td className="px-4 py-2 text-center border">
                      <div className="flex items-center justify-center">
                        <FaRupeeSign className="mr-1" />
                        {formatNumber(item.price)}
                      </div>
                    </td>

                    <td className="px-4 py-2 text-center border">
                      {item.fuelType}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {formatNumber(item.kmDriven)} kms
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {item.transmission}
                    </td>

                    <td className="px-4 py-2 text-center border">
                      {item.published ? (
                        <span className="bg-lime-400 text-black rounded-full px-5 py-1 text-xs">
                          Published
                        </span>
                      ) : (
                        <span className="bg-amber-500 text-black rounded-full px-5 py-1 text-xs">
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-2 text-center border">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="bg-blue-600 text-white rounded p-2.5 hover:bg-blue-700 transition"
                          onClick={() =>
                            router.push(
                              `/admin/truevalue/manage-vehicles/edit/${item._id}`
                            )
                          }
                        >
                          <PenBox className="h-4 w-4" />
                        </button>

                        <button
                          className="bg-red-600 text-white rounded p-2.5 hover:bg-red-700 transition disabled:opacity-50"
                          disabled={isDeleting}
                          onClick={() => {
                            setSelectedId(item._id);
                            setIsOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClick={handleDelete}
        loading={isDeleting}
      />
    </div>
  );
}
