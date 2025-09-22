import ProfileHeader from "@/features/profile/components/ProfileHeader.tsx";
import ProfileContact from "@/features/profile/components/ProfileContact.tsx";
import ProfileInfo from "@/features/profile/components/ProfileInfo.tsx";

export default function ProfilePage() {
    return <div className="max-w-xl mx-auto px-8 py-4 bg-white rounded-2xl border">
        <ProfileHeader />
        <hr className="my-4"/>
        <ProfileContact />
        <hr className="my-4"/>
        <ProfileInfo />
    </div>
}