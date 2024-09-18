import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="min-h-[100vh] w-full grid grid-rows-[40px_minmax(900px,_1fr)] grid-cols-1 ">
      <Topbar />
      {/* <div className="grid grid-rows-1 grid-cols-[300px_minmax(900px,_1fr)]"> */}
      <div className="flex transition-all">
        <Sidebar />
        <section>
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default Layout;
