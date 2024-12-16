import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section className="pt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">FAQs</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I enroll in a course?</AccordionTrigger>
          <AccordionContent>
            You can enroll in a course by visiting our courses page and
            selecting your desired program. Follow the enrollment instructions
            provided on the course page.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards, PayPal, and bank transfers.
            Payment plans are also available for selected courses.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Are there any prerequisites for courses?
          </AccordionTrigger>
          <AccordionContent>
            Prerequisites vary by course. Please check the specific course
            details page for any requirements or recommended background
            knowledge.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
