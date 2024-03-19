import { Container } from "@/components/container";
import { PageNavigations } from "@/components/page-navigations";
import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <Container className="flex flex-col gap-4">
      <PageNavigations
        links={[{ label: "Home", href: "/" }]}
        pageLabel="Profile"
      />
      <UserProfile/>
    </Container>
  );
};

export default ProfilePage;
