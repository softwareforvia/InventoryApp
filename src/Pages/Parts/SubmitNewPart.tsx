import React from "react";
import PartInfoCard from "./PartInfoCard";
import { iPartData } from "./PartInterface";
import dayjs, { Dayjs } from "dayjs";

const emptyPart: iPartData = {
    partID: 0,
    partNumber: "",
    revision: "",
    partName: "",
    partDescription: "",
    unitMeasure: "",
    conversion: "",
    price: 0,
    partCategory: "",
    partFamily: "",
    traceabilityInfo: "",
    supplierPartNumber: "",
    manufacturer: "",
    vendor: "",
    hazard: "",
    storageRequirement: "",
    packagingRequirement: "",
    requireShelfLife: false,
    shelfLife: "",
    inspectionRequired: false,
    inspectionDetails: "",
    owner: "",
    createdDate: dayjs(new Date()),
    lastModifiedDate: dayjs(new Date()),
    lastModifiedBy: "",
    notes: ""
}

export default function PartMaster(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
      <div>
          <PartInfoCard partData={emptyPart} isLoading={isLoading} setIsLoading={setIsLoading} isNewPart={true}>
          </PartInfoCard>
      </div>
  );
}