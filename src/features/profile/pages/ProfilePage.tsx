import ProfileHeader from "@/features/profile/components/ProfileHeader.tsx";
import ProfileContact from "@/features/profile/components/ProfileContact.tsx";
import ProfileInfo from "@/features/profile/components/ProfileInfo.tsx";
import QualificationListView from "@/features/profile/components/QualificationListView.tsx";

export default function ProfilePage() {
    return <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-xl mx-auto px-8 py-4 bg-white rounded-2xl border">
                <ProfileHeader />
                <hr className="my-4"/>
                <ProfileContact />
                <hr className="my-4"/>
                <ProfileInfo />
                <hr className="my-4"/>
                <QualificationListView/>
            </div>
        </div>
    </div>
}