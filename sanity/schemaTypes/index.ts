import { type SchemaTypeDefinition } from "sanity";

// Blog related schemas
import authorType from "./blog/authorType";
import blogTestimonialType from "./blog/blogTestimonialType";
import blogType from "./blog/blogType";

// Event schema
import eventType from "./event/eventType";

// Testimonial schema
import customerTestimonialType from "./testimonial/customerTestimonialType";

// Social schema
import socialType from "./social/socialType";

// FAQ schema
import faqType from "./faq/faqType";

// Legal documents schemas
import privacyPolicyType from "./legal/privacyPolicyType";
import termsOfUseType from "./legal/termsOfUseType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Blog
    blogType,
    authorType,
    blogTestimonialType,

    // Event
    eventType,

    // Testimonials
    customerTestimonialType,

    // Social
    socialType,

    // FAQ
    faqType,

    // Legal
    termsOfUseType,
    privacyPolicyType,
  ],
};
