/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "../../app/stores/toastMessageStore";
import GenericForm from "../../shared/components/generics/GenericForm";
import { formFields, schema, type FormType } from "./addAuctionData";

const AddAuction = () => {
  const defaultValues: FormType = {
    title: "Laptop 1123",
    description:
      "Up for auction is a professional-grade workstation in pristine condition. This machine has been my daily driver for software development over the past six months, and it has handled every task with ease. It features a high-refresh-rate display with 100% sRGB coverage, making it ideal for both coding and creative work. The thermal performance is outstanding; I have recently performed a full internal cleaning and replaced the stock thermal paste with a high-end compound to ensure peak performance under heavy load. The battery cycle count is remarkably low as it was mostly used on a desk setup. It comes in its original retail packaging with all documentation and the original high-capacity power adapter. I am selling this only because my company provided me with a new upgrade. No scratches, no dents, and no dead pixels—guaranteed.",
    validFrom: "2026-04-30T15:00",
    endsAt: "2026-05-30T16:00",
    startingPrice: 100,
    buyoutPrice: 110,
    condition: 1,
    delivery: [1],
    categoryId: 1,
    placeId: 22,
    minimumStep: 100,
    images: [],
  };

  const { setSuccessToast } = useToast();

  const handleSuccess = (resp: any) => {
    console.log(resp);
    setSuccessToast("Auction created successfully");
  };

  return (
    <div className="create-auction">
      <GenericForm
        title="Create an Auction"
        fields={formFields}
        validation={schema}
        defaultValues={defaultValues}
        submitBtnText="Create an auction"
        endpoints={{
          add: "/auctions",
        }}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default AddAuction;
