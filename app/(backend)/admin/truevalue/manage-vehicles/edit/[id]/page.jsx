import { VehicleEditForm } from "@/app/(backend)/_components/vehilce-edit-form";

const EditTruevalueVehicle = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/truevalue/${id}`
  );

  const data = await res.json();

  return <VehicleEditForm vehicle={data.vehicle} />;
};

export default EditTruevalueVehicle;
