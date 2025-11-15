import type {Service} from "@/types/models/Service.ts";

export interface AddedService extends Service {
    request: string,
}