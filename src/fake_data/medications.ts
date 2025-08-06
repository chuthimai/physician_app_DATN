type Medication = {
    'identifier': number,
    'name': string,
    'code': string,
    'doseForm': string,
}

export const medications: Medication[] = [
    {
        "identifier": 1,
        "name": "Paracetamol",
        "code": "387517004",          // SNOMED CT code for Paracetamol
        "doseForm": "385055001"       // Tablet dose form
    },
    {
        "identifier": 2,
        "name": "Amoxicillin",
        "code": "372687004",
        "doseForm": "385057009"       // Capsule
    },
    {
        "identifier": 3,
        "name": "Ibuprofen",
        "code": "387458008",
        "doseForm": "385055001"
    },
    {
        "identifier": 4,
        "name": "Ceftriaxone",
        "code": "372729009",
        "doseForm": "385219001"       // Injection
    },
    {
        "identifier": 5,
        "name": "Salbutamol",
        "code": "372729000",
        "doseForm": "385157007"       // Inhaler
    },
    {
        "identifier": 6,
        "name": "Metformin",
        "code": "372729007",
        "doseForm": "385055001"
    },
    {
        "identifier": 7,
        "name": "Omeprazole",
        "code": "372729005",
        "doseForm": "385057009"
    },
    {
        "identifier": 8,
        "name": "Loratadine",
        "code": "372729006",
        "doseForm": "385055001"
    },
    {
        "identifier": 9,
        "name": "Insulin",
        "code": "116602009",
        "doseForm": "385219001"
    },
    {
        "identifier": 10,
        "name": "Azithromycin",
        "code": "372729003",
        "doseForm": "385057009"
    }
]

export const medicationCodeMap: Record<string, string> = {
    "387517004": "Paracetamol",
    "372687004": "Amoxicillin",
    "387458008": "Ibuprofen",
    "372729009": "Ceftriaxone",
    "372729000": "Salbutamol",
    "116602009": "Insulin",
    // ...thêm mã khác
};

export const doseFormMap: Record<string, string> = {
    "385055001": "Viên nén",
    "385057009": "Viên nang",
    "385219001": "Thuốc tiêm",
    "385157007": "Dụng cụ hít",
    // ...thêm mã khác
};

