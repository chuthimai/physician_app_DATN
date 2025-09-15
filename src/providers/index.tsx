import { UserProvider } from "@/providers/user/UserProvider.tsx";
import React from "react";
import {MedicationsProvider} from "@/providers/medications/MedicationsProvider.tsx";
import {MedicationEditingProvider} from "@/providers/medications/MedicationEditingProvider.tsx";
import {ServicesProvider} from "@/providers/services/ServicesProvider.tsx";
import {PatientRecordIdProvider} from "@/providers/patient_record/PatientRecordIdProvider.tsx";
import {PatientProvider} from "@/providers/patient/PatientProvider.tsx";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
            <MedicationsProvider>
                <MedicationEditingProvider>
                    <ServicesProvider>
                        <PatientRecordIdProvider>
                            <PatientProvider>
                                {children}
                            </PatientProvider>
                        </PatientRecordIdProvider>
                    </ServicesProvider>
                </MedicationEditingProvider>
            </MedicationsProvider>
        </UserProvider>
    );
};
