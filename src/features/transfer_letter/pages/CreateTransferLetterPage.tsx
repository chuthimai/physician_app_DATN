import TransferLetterForm from "@/features/transfer_letter/components/TransferLetterForm.tsx";

export default function CreateTransferLetterPage() {
    return <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">Giấy chuyển tuyến</h2>
        <TransferLetterForm/>
    </div>
}