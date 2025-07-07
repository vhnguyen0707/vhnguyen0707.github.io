import React, { forwardRef } from "react";

const Contact = forwardRef<HTMLElement>((props, ref) => (
  <section
    id="contact"
    ref={ref}
    style={{ height: "80vh", marginBottom: "40px" }}
    {...props}
  >
    <h1>Contact</h1>
    <p>Contact info...</p>
  </section>
));

export default Contact; 