import type AssessmentItem from "@/types/AssessmentItem.ts";

export const assessmentItems: AssessmentItem[] = [
    {
        "identifier": 13,
        "name": "Nhóm 1",
        "children": [
            {
                "identifier": 14,
                "name": "Ure",
                "children": [],
                "measurementIndicator": {
                    "identifier": 14,
                    "type": "Ure",
                    "unit": "mmol/L",
                    "minimum": 3,
                    "maximum": 8
                }
            },
            {
                "identifier": 15,
                "name": "Cholesterol toàn phần",
                "children": [],
                "measurementIndicator": {
                    "identifier": 15,
                    "type": "Cholesterol toàn phần",
                    "unit": "mmol/L",
                    "minimum": 3,
                    "maximum": 5
                }
            }
        ]
    },
    {
        "identifier": 16,
        "name": "Nhóm 2",
        "children": [
            {
                "identifier": 17,
                "name": "Glucose",
                "children": [],
                "measurementIndicator": {
                    "identifier": 17,
                    "type": "Cholesterol toàn phần",
                    "unit": "mmol/L",
                    "minimum": 3,
                    "maximum": 5
                }
            }
        ]
    },
    {
        "identifier": 21,
        "name": "Nhóm 3",
        "children": [
            {
                "identifier": 24,
                "name": "Ure",
                "children": [],
            },
            {
                "identifier": 25,
                "name": "Cholesterol toàn phần",
                "children": [],
            }
        ]
    },
    {
        "identifier": 26,
        "name": "Nhóm 4",
        "children": [
            {
                "identifier": 27,
                "name": "Glucose",
                "children": [],
            }
        ]
    },
];