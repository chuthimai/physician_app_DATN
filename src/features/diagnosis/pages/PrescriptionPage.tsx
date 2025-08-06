import PrescriptionForm from "@/features/diagnosis/components/PrescriptionForm.tsx";
import ButtonInfo from "@/components/button/ButtonInfo.tsx";
import {useDialog} from "@/features/diagnosis/hooks/useDialog.ts";
import PrescriptionTable from "@/features/diagnosis/components/PrescriptionTable.tsx";

export default function PrescriptionPage() {
    const { open, openDialog, setOpen } = useDialog();

    return <div className="flex flex-col ">
        <div className="flex gap-4 items-center justify-center mb-4 relative">
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-center">Kê Thuốc</h2>
            </div>

            <ButtonInfo
                label={"Xem đơn thuốc"}
                onClick={openDialog}
                className="font-bold absolute right-0"
            />
        </div>

        {/*Hiển thị 1 lớp phủ để xem đơn thuốc*/}
        <div className="w-full">
            <PrescriptionTable open={open} onOpenChange={setOpen}/>
        </div>

        <PrescriptionForm/>
    </div>
}