import { Suspense, type ReactNode } from "react";
import Loading from "./Loading";

type Props = {
    children: ReactNode;
};

export default function WithSuspense({ children }: Props) {
    return (
        <Suspense
            fallback={
                <div className="fixed inset-0 flex items-center justify-center bg-white">
                    <Loading />
                </div>
            }
        >
            {children}
        </Suspense>
    );
}
