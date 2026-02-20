
import { App } from "antd";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";
import { FooterSection } from "../landing/TensorLabLandingPage/sections/FooterSection";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <App component={false}>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <FooterSection />
      </div>
    </App>
  );
}
