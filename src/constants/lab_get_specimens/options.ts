import type {Option} from "@/types/option.ts";
import {SPECIMEN_TYPE, specimenTypeToVn} from "@/constants/lab_get_specimens/specimen_type.ts";
import {SPECIMEN_CONDITION, specimenConditionToVn} from "@/constants/lab_get_specimens/specimen_condition.ts";
import {SPECIMEN_STATUS, specimenStatusToVn} from "@/constants/lab_get_specimens/speciment_status.ts";

export const labTypeOptions: Option[] = [
    {
        value: "1",
        label: "Xét nghiệm hóa sinh máu",
    }
];

export const specimenTypeOptions: Option[] = Object.values(SPECIMEN_TYPE).map(value => ({
    label: specimenTypeToVn(value),
    value,
}));

export const specimenConditionOptions: Option[] = Object.values(SPECIMEN_CONDITION).map(value => ({
    label: specimenConditionToVn(value),
    value,
}));

export const specimenStatusOptions: Option[] = Object.values(SPECIMEN_STATUS).map(value => ({
    label: specimenStatusToVn(value),
    value,
}));