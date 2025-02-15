import { Sidebar } from "@/app/components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Sidebar />
      <div className="lg:pl-[256px] h-full">
        <div className="h-full max-w-[1200px] mx-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;