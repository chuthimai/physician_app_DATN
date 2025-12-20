export interface SummaryReportResponse {
    totalReports: number,
    totalClosedReports: number,
    serviceGroups: Record<string, number>,
    totalPatient: number,
    patientStatsByDate: Record<string, number>,
    sexGroups: Record<string, number>,
    ageGroups: Record<string, number>,

    totalSpecimens?: number;
    totalClosedSpecimens?: number;
}