import type { Metadata } from "next";
import ShowroomClient from "../../components/showroom/ShowroomClient";

export const metadata: Metadata = {
  title: "Showroom — Step Inside",
  description:
    "Explore the full Everwood Sauna lineup in an immersive cedar-lined 3D showroom. Browse every collection in atmospheric warm light.",
  openGraph: {
    title: "Everwood Showroom",
    description:
      "An immersive 3D showroom for the full Everwood Sauna collection.",
    type: "website",
  },
};

export default function ShowroomPage() {
  return (
    <div className="bg-charcoal min-h-screen">
      <ShowroomClient />
    </div>
  );
}
