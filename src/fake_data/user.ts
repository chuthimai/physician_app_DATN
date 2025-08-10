const ROLES = {
    ATTENDING_PHYSICIAN: "attendingPhysician",
    LAB_PHYSICIAN: "labPhysician",
    IMAGING_PHYSICIAN: "imagingPhysician",
};

// Fake User
export const users = [
    { id: 1, name: "Bác sĩ Nguyễn Văn A", telecom: "0901234567", email: "a@hospital.com", gender: true, birthDate: "1980-05-15", photo: "", password: "12345678", role: ROLES.ATTENDING_PHYSICIAN },
    { id: 2, name: "Bác sĩ Trần Thị B", telecom: "0912345678", email: "b@hospital.com", gender: false, birthDate: "1985-03-22", photo: "", password: "12345678", role: ROLES.LAB_PHYSICIAN },
    { id: 3, name: "Bác sĩ Lê Văn C", telecom: "0923456789", email: "c@hospital.com", gender: true, birthDate: "1978-08-09", photo: "", password: "12345678", role: ROLES.IMAGING_PHYSICIAN },
];

// Fake Staff
export const staff = [
    { Userid: 1, address: "123 Đường A, Hà Nội", startDate: "2010-01-01", endDate: null, active: 1 },
    { Userid: 2, address: "456 Đường B, Hà Nội", startDate: "2015-06-01", endDate: null, active: 1 },
    { Userid: 3, address: "789 Đường C, Hà Nội", startDate: "2012-09-15", endDate: null, active: 1 },
];

// Fake MedicalSpecialty
export const medicalSpecialties = [
    { id: 1, name: "Nội tổng quát", description: "Khám và điều trị bệnh nội khoa", contact: "0241234567" },
    { id: 2, name: "Xét nghiệm", description: "Thực hiện xét nghiệm y khoa", contact: "0242345678" },
    { id: 3, name: "Chẩn đoán hình ảnh", description: "Siêu âm, X-quang, MRI", contact: "0243456789" },
];

// Fake Physician (liên kết Staff và MedicalSpecialty)
export const physicians = [
    { StaffUserid: 1, MedicalSpecialtyid: 1 },
    { StaffUserid: 2, MedicalSpecialtyid: 2 },
    { StaffUserid: 3, MedicalSpecialtyid: 3 },
];

// Fake Qualification
export const qualifications = [
    { id: 1, code: "BSNT01", issuer: "Bộ Y tế", period: "2030-12-31", PhysicanStaffUserid: 1 },
    { id: 2, code: "BSXN01", issuer: "Bộ Y tế", period: "2031-12-31", PhysicanStaffUserid: 2 },
    { id: 3, code: "BSCDHA01", issuer: "Bộ Y tế", period: "2032-12-31", PhysicanStaffUserid: 3 },
];
