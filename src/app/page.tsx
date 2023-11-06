import HomeTabs from "@/components/HomeTabs/HomeTabs";
import Profiles from "@/components/Profiles";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import ProfessionalTimeline from "@/components/ProfessionalTimeline";

export default function Home() {
  return (
    <>
      <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 xl:grid-rows-1 pt-8">
        <div className="xl:col-span-3 xl:row-start-auto xl:row-end-auto lg:pb-32">
          <div className="pb-4">
            <HomeTabs />
          </div>
        </div>
        <div className="xl:col-span-2 xl:row-start-auto xl:row-end-auto">
          <div className="pb-4 xl:hidden lg:hidden">
            <ContactForm show={false} />
          </div>
          <div className="pb-4">
            <Profiles />
          </div>
          <div className="pb-4">
            <ProfessionalTimeline />
          </div>
          <div className="pb-4">
            <Testimonials />
          </div>
          <div className="pb-4 hidden lg:block xl:hidden">
            <ContactForm show={true} />
          </div>
          <div className="pb-4 hidden xl:block">
            <ContactForm show={true} />
          </div>
          {/* <div className='pb-4'>
            <ResumeDownload />
          </div> */}
        </div>
      </main>
    </>
  );
}
