import { useContext, useMemo } from "react";
import {ServicesContext} from "@/providers/services/ServicesContext.tsx";
import type { Service } from "../type";
import {services} from "@/fake_data/services.ts";

export function useMapService() {
    const servicesContext = useContext(ServicesContext);

    const mappedServices: Service[] = useMemo(() => {
        if (!servicesContext?.services) return [];

        return servicesContext.services
            .map((sendItem) => {
                const fullService = services.find(
                    (svc) => svc.identifier === sendItem.identifier
                );
                return fullService ? ({...fullService, note: sendItem.note} as Service) : null;
            })
            .filter((svc): svc is Service => svc !== null);
    }, [servicesContext?.services]);

    return {
        mappedServices: mappedServices,
    };
}
