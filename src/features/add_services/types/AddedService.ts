import type {Service} from "@/types/models/Service.ts";

interface AddedService  extends Service {
    proposal?: string,
}