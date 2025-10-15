import {
    CONDITION_DIAGNOSIS_SEVERITY,
    conditionDiagnosisSeverityToVn
} from "@/constants/diagnosis/condition_diagnosis_severity.ts";
import {OBSERVATION_CATEGORY_CODE, observationCategoryCodeToVn} from "@/constants/diagnosis/observation_category_code.ts";
import {OBSERVATION_METHOD, observationMethodToVn} from "@/constants/diagnosis/observation_method.ts";

type Option = {
    label: string;
    value: string;
};

export const severityOptions: Option[] = Object.values(CONDITION_DIAGNOSIS_SEVERITY).map(value => ({
    label: conditionDiagnosisSeverityToVn(value),
    value,
}));

export const categoryOptions: Option[] = Object.values(OBSERVATION_CATEGORY_CODE).map(value => ({
    label: observationCategoryCodeToVn(value),
    value,
}));

export const methodOptions: Option[] = Object.values(OBSERVATION_METHOD).map(value => ({
    label: observationMethodToVn(value),
    value,
}));