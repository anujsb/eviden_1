import AlumniDirectory from "@/components/AlumniDirectory";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <AlumniDirectory />
    </div>
  );
}
