import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "@/app/components/sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[320px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/dashboard">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/rocket.png" alt="Mascot" width={40} height={40} />
          <h1 className="text-2xl font-extrabold text-zinc-700 tracking-wide">
            VenturePilot
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        
        <SidebarItem
          label={"Idea Validation"}
          iconSrc={"/bulb.png"}
          href={"/validation"}
        />
        <SidebarItem
          label={"Pitch Deck Builder"}
          iconSrc={"/deck.png"}
          href={"/deck"}
        />
        <SidebarItem label={"Matching"} iconSrc={"/match.png"} href={"/match"} />
        <SidebarItem label = {"Financial Planning"} iconSrc={"/planning.png"} href={"/planning"}/>
        <SidebarItem label={"Pitch Analyser"} iconSrc={"/analyser.png"} href={"/elevatorpitch"} />
        <SidebarItem label={"Automation"} iconSrc={"/automation.png"} href={"/automation"} />
      
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="size-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};