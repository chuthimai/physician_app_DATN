import {Colors} from "../../constants/colors.ts";

type Props = {
    onNext: () => void;
    onSkip: () => void;
};

export default function DoubleButton({ onNext, onSkip }: Props) {
    return (
        <div className="flex ">
            <button onClick={onNext}
                    className={`${Colors.DoubleButtonPrimary} ${Colors.DoubleButtonPrimaryHover} px-4 py-2 border-2`}
            >
                Tiếp theo
            </button>
            <button onClick={onSkip}
                    className={`${Colors.DoubleButtonSecondary} ${Colors.DoubleButtonSecondaryHover} px-4 py-2 border-2`}
            >
                Bỏ qua
            </button>
        </div>
    );
}
