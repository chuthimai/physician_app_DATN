import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";

export const serviceTypeOptions = Object.values(SERVICE_TYPES).map(value => ({
    label: value,
    value,
}));