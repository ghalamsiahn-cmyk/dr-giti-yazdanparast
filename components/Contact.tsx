"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { Logo } from "@/components/Logo";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const { contact } = site;
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend / Supabase
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-content px-6">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Form column — right in RTL */}
          <div>
            <Reveal>
              <p className="text-[11px] tracking-[0.45em] uppercase text-gold font-medium mb-5">
                تماس با ما
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-darktext mb-3 leading-tight">
                {contact.title}
              </h2>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="text-base text-darktext/55 font-sans mb-10 leading-relaxed">
                {contact.description}
              </p>
            </Reveal>

            {submitted ? (
              <Reveal>
                <div className="rounded-2xl bg-primary/6 border border-primary/15 p-8 text-center">
                  <svg className="w-12 h-12 text-gold mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <h3 className="font-heading font-bold text-xl text-primary mb-2">پیام شما ارسال شد!</h3>
                  <p className="text-sm text-darktext/60 font-sans">در اسرع وقت با شما تماس خواهیم گرفت.</p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.18}>
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-sans text-darktext/60 mb-1.5">
                        نام <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        placeholder="نام"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] font-sans text-darktext placeholder-darktext/30 focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-sans text-darktext/60 mb-1.5">
                        نام خانوادگی <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        placeholder="نام خانوادگی"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] font-sans text-darktext placeholder-darktext/30 focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email + Phone row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-sans text-darktext/60 mb-1.5">
                        ایمیل
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        dir="ltr"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] font-sans text-darktext placeholder-darktext/30 focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-sans text-darktext/60 mb-1.5">
                        تلفن <span className="text-gold">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="۰۹۱۲..."
                        dir="ltr"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] font-sans text-darktext placeholder-darktext/30 focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[12px] font-sans text-darktext/60 mb-1.5">
                      پیام
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="پیام یا سوال شما..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] font-sans text-darktext placeholder-darktext/30 focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-primary text-cream text-[14px] font-sans font-medium hover:bg-deep transition-all duration-200 shadow-md shadow-primary/15"
                  >
                    ارسال پیام
                  </button>

                </form>
              </Reveal>
            )}
          </div>

          {/* Info / Image column — left in RTL */}
          <Reveal delay={0.2} direction="left">
            <div className="flex flex-col gap-8 h-full">

              {/* Image or decorative panel */}
              <div className="min-h-[160px] max-h-[200px] rounded-2xl overflow-hidden relative">
                {contact.formImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={contact.formImage}
                    alt="کلینیک دکتر گیتی یزدانپرست"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-deep to-primary flex flex-col items-center justify-center gap-6 p-8">
                    <Logo className="h-20 w-20" light />
                    <div className="text-center">
                      <p className="font-heading font-bold text-2xl text-cream mb-2">
                        {site.brand.name}
                      </p>
                      <p className="text-sm text-cream/60 font-sans">
                        {site.brand.usp}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact quick links */}
              <div className="grid grid-cols-1 gap-3">
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 hover:border-primary/20 hover:bg-primary/4 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-darktext/40 font-sans">تماس تلفنی</p>
                    <p className="text-[14px] font-sans text-darktext font-medium" dir="ltr">{contact.phone}</p>
                  </div>
                </a>


<a
                  href={contact.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 hover:border-[#E1306C]/20 hover:bg-[#E1306C]/4 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-[#E1306C]/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#E1306C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2.25" y="2.25" width="19.5" height="19.5" rx="5" />
                      <circle cx="12" cy="12" r="4.5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-darktext/40 font-sans">اینستاگرام</p>
                    <p className="text-[14px] font-sans text-darktext font-medium" dir="ltr">{contact.instagramHandle}</p>
                  </div>
                </a>
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
