import type Specimen from "@/features/lab_get_specimens/types/Specimen.ts";
import {SPECIMEN_TYPE} from "@/constants/lab_get_specimens/specimen_type.ts";
import {SPECIMEN_CONDITION} from "@/constants/lab_get_specimens/specimen_condition.ts";
import {SPECIMEN_STATUS} from "@/constants/lab_get_specimens/speciment_status.ts";

export const specimens: Specimen[] = [
    {
        identifier: 1,
        type: SPECIMEN_TYPE.CSF,
        condition: SPECIMEN_CONDITION.NORMAL,
        status: SPECIMEN_STATUS.AVAILABLE,
        receivedTime: new Date().toString(),
    },
    {
        identifier: 2,
        type: SPECIMEN_TYPE.BLOOD,
        condition: SPECIMEN_CONDITION.NORMAL,
        status: SPECIMEN_STATUS.AVAILABLE,
        receivedTime: new Date().toString(),
    },
    {
        identifier: 3,
        type: SPECIMEN_TYPE.SALIVA,
        condition: SPECIMEN_CONDITION.NORMAL,
        status: SPECIMEN_STATUS.AVAILABLE,
        receivedTime: new Date().toString(),
    },
    {
        identifier: 4,
        type: SPECIMEN_TYPE.SEMEN,
        condition: SPECIMEN_CONDITION.NORMAL,
        status: SPECIMEN_STATUS.AVAILABLE,
        receivedTime: new Date().toString(),
    },
    {
        identifier: 5,
        type: SPECIMEN_TYPE.STOOL,
        condition: SPECIMEN_CONDITION.NORMAL,
        status: SPECIMEN_STATUS.AVAILABLE,
        receivedTime: new Date().toString(),
    },
    {
        identifier: 6,
        type: SPECIMEN_TYPE.TISSUE,
        condition: SPECIMEN_CONDITION.NORMAL,
        status: SPECIMEN_STATUS.AVAILABLE,
        receivedTime: new Date().toString(),
    },
    {
        identifier: 7,
        type: SPECIMEN_TYPE.BLOOD,
        condition: SPECIMEN_CONDITION.NORMAL,
        status: SPECIMEN_STATUS.AVAILABLE,
        receivedTime: new Date().toString(),
    },
    {
        identifier: 8,
        type: SPECIMEN_TYPE.BLOOD,
        condition: SPECIMEN_CONDITION.NORMAL,
        status: SPECIMEN_STATUS.AVAILABLE,
        receivedTime: new Date().toString(),
    },
];