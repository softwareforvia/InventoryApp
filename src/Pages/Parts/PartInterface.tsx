/* Define Part Objects */

import { GridColDef } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";

export interface iPartData {
    partID: number,
    partNumber: string,
    revision: string,
    partName: string,
    partDescription: string,
    unitMeasure: string,
    conversion: string,
    price: number,
    partCategory: string,
    partFamily: string,
    traceabilityInfo: string,
    supplierPartNumber: string,
    manufacturer: string,
    vendor: string,
    hazard: string,
    storageRequirement: string,
    packagingRequirement: string,
    requireShelfLife: boolean,
    shelfLife: string,
    inspectionRequired: boolean,
    inspectionDetails: string,
    owner: string,
    createdDate: Dayjs,
    lastModifiedDate: Dayjs,
    lastModifiedBy: string,
    notes: string
}

export const mapJSONtoPart = (raw: any) => {
    return ({
        partID: raw["Part ID"],
        partNumber: raw["Part Number"],
        revision: raw["Revision"],
        partName: raw["Part Name"],
        partDescription: raw["Part Description"],
        unitMeasure: raw["Unit of Measure"],
        conversion: raw["Conversion"],
        price: raw["Price"],
        partCategory: raw["Part Category"],
        partFamily: raw["Part Family"],
        traceabilityInfo: raw["Traceability Info"],
        supplierPartNumber: raw["Supplier Part Number"],
        manufacturer: raw["Manufacturer"],
        vendor: raw["Vendor"],
        hazard: raw["Hazard"],
        storageRequirement: raw["Storage Requirement"],
        packagingRequirement: raw["Packaging Requirement"],
        requireShelfLife: raw["Require Shelf Life"],
        shelfLife: raw["Shelf Life"],
        inspectionRequired: raw["Inspection Required"],
        inspectionDetails: raw["QA Inspection Details"],
        owner: raw["Owner"],
        createdDate: dayjs(new Date(raw["Created Date"])),
        lastModifiedDate: dayjs(new Date(raw["Last Modified Date"])),
        lastModifiedBy: raw["Last Modified By"],
        notes: raw["Notes"]
    } as iPartData);
}

export interface iPartsByRevision {
    partNumber: string,
    latestRev: string,
    latestCreated: Dayjs,
    partOptions: iPartData[] 
}

// group by revision so parts can be sorted later (and latest only can be displayed)
export const mapPartsByRevision = (allParts: iPartData[]) => {
    const newList: iPartsByRevision[] = [];

    allParts.forEach((part) => {
        const partInList = newList.find((revPart) => revPart.partNumber === part.partNumber);
        if (partInList){
            if (part.createdDate > partInList.latestCreated){
                partInList.latestRev = part.revision;
                partInList.latestCreated = part.createdDate;
            } // update most recent rev data
            partInList.partOptions.push(part); //always add part to options
        }
        else{
            newList.push({
                partNumber: part.partNumber, 
                latestRev: part.revision, 
                latestCreated: part.createdDate,
                partOptions: [part]
            }) //add new part to the list with only one revision
        }
    })
    return newList;
}