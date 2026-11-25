import { DatasetSection } from "@/components/DatasetSection";
import { EstimatorStudio } from "@/components/EstimatorStudio";
import { FAQSection } from "@/components/FAQSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteNav />
      <main id="main">
        <EstimatorStudio />
        <DatasetSection />
        <FAQSection />
      </main>
      <SiteFooter />
    </>
  );
}
