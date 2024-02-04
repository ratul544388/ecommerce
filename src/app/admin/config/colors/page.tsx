import { PageNavigations } from "@/components/page-navigations";
import { db } from "@/lib/db";
import { ColorForm } from "../../_components/color-form";
import { ColorBox } from "../../_components/color-box";

const ColorsPage = async () => {
  const colors = await db.color.findMany();
  return (
    <div className="space-y-4">
      <PageNavigations
        links={[
          {
            label: "Dashbboard",
            href: "/admin/dashboard",
          },
          {
            label: "Config",
            href: "/admin/config/colors",
          },
        ]}
        pageLabel="Colors"
      />
      <div className="p-5 shadow-md border rounded-md max-w-screen-lg mx-auto flex flex-col gap-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="w-full">
            {colors.map((color) => (
              <ColorBox color={color} key={color.id} />
            ))}
          </div>
          <ColorForm />
        </div>
      </div>
    </div>
  );
};

export default ColorsPage;
