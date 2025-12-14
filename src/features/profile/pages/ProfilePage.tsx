import ProfileHeader from "@/features/profile/components/ProfileHeader.tsx";
import ProfileContact from "@/features/profile/components/ProfileContact.tsx";
import ProfileInfo from "@/features/profile/components/ProfileInfo.tsx";
import QualificationListView from "@/features/profile/components/QualificationListView.tsx";

export default function ProfilePage() {
    return (
        <div className="h-full flex">
            <div className="flex-1 overflow-hidden">
                <div className="max-w-6xl mx-auto h-full px-8 py-4">

                    {/* GRID CHÍNH */}
                    <div className="grid grid-rows-[auto_1fr] gap-4 h-full bg-white rounded-3xl border p-6">

                        {/* ROW 1: HEADER (full width) */}
                        <div>
                            <ProfileHeader />
                        </div>
                        <hr className="my-2" />

                        {/* ROW 2: 2 CỘT SCROLL RIÊNG */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">

                            {/* LEFT COLUMN */}
                            <div className="bg-white rounded-2xl p-6 overflow-y-auto">
                                <ProfileContact />
                                <hr className="my-4" />
                                <ProfileInfo />
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="bg-white rounded-2xl border p-6 overflow-y-auto">
                                <QualificationListView />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
