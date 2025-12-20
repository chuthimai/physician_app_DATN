import type {Prescription} from "@/types/models/Prescription.ts";

export default interface PrescriptionResponse extends Prescription{
    advice?: string,
}