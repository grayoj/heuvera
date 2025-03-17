"use client";
import Categories from "./components/Categories/Categories";
import NavigationBar from "./components/navigation/navigationbar";


export default function Home() {
  return (
    <>
      <div className="bg-[#F3F2EC] px-20 h-screen">
        <NavigationBar />
        <Categories/>
      </div>
    </>
  );
}
