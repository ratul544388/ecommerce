import { PageNavigations } from "@/components/page-navigations";
import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageNavigations
        links={[{ label: "Home", href: "/" }]}
        pageLabel="Profile"
      />
      <UserProfile/>
    </div>
  );
};

export default ProfilePage;
