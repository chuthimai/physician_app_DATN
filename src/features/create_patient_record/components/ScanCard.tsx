import ButtonScan from "../../../components/button/ButtonScan.tsx";

interface ScanCardProps {
    onScanClick: () => void;
}

export default function ScanCard({ onScanClick }: ScanCardProps) {
    return (
        <div>
            <ButtonScan
                onClick={onScanClick}
                className="font-bold"
                label={"Quét CCCD"}
            />
        </div>
    );
};


