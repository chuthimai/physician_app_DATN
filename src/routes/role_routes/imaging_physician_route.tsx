import type {Route} from "../types.ts";
import ImageReportsPage from "@/features/image_result/pages/ImageReportsPage.tsx";
import ImageResultPage from "@/features/image_result/pages/ImageResultPage.tsx";
import AddImagePage from "@/features/add_image/pages/AddImagePage.tsx";
import DoImageResultPage from "@/features/image_result/pages/DoImageResultPage.tsx";

export function getImagingPhysicianRoute(): Route[] {
    return [
        {
            path: "thuc-hien-ky-thuat",
            element: <AddImagePage/>
        },
        {
            path: "ket-qua-hinh-anh",
            element: <ImageResultPage/>,
            children: [
                {
                    path: "",
                    element: <ImageReportsPage/>
                },
                {
                    path: "ket-qua/:reportId",
                    element: <DoImageResultPage/>
                },
            ]
        }
    ];
}