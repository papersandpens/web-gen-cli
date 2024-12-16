import { Metadata } from "next";
import ContactForm from "./_components/ContactForm";
import LocationsSection from "./_components/LocationsSection";
import FaqSection from "./_components/FaqSection";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nti.edu';
  
  return {
    title: 'Contact Us | NTI',
    description: 'Get in touch with NTI. Contact us for any questions about our courses, programs, or general inquiries.',
    alternates: {
      canonical: `${baseUrl}/${params.locale}/contact`,
    },
  };
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid gap-12 lg:gap-16">
        {/* Contact Form Section */}
        <section>
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Contact us</h1>
          <ContactForm />
        </section>

        {/* Locations Section */}
        <LocationsSection />

        {/* FAQs Section */}
        <FaqSection />
      </div>
    </main>
  );
}
