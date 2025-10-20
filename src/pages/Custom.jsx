import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Custom({ t }) {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      form.current.reset();
    } catch (err) {
      alert("Email failed: " + (err?.text || err?.message || "unknown"));
    }
  };

  return (
    <div className="py-12 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t.customTitle}</h2>
      {sent ? <div className="p-4 bg-green-700 rounded">Request sent. Check your email.</div> :
        <form ref={form} onSubmit={send} className="flex flex-col gap-3 bg-white/5 p-6 rounded">
          <input name="user_name" placeholder="Your name" required className="p-3 rounded bg-black/40 text-white" />
          <input name="user_email" type="email" placeholder="Your email" required className="p-3 rounded bg-black/40 text-white" />
          <textarea name="message" placeholder="Describe your design" required className="p-3 rounded bg-black/40 text-white h-32" />
          <button className="px-4 py-2 bg-pink-600 rounded">Send Request</button>
        </form>
      }
    </div>
  );
}
