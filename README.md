# سایت دکتر گیتی یزدانپرست

وب‌سایت معرفی کلینیک «لیزر و زیبایی با حضور مستقیم پزشک» در یزد، ساخته‌شده با **Next.js + Tailwind CSS** و کاملاً مطابق Brand Guide 2026 (راست‌چین / فارسی).

## اجرا روی سیستم خودت

```bash
npm install
npm run dev
```

سپس مرورگر را روی [http://localhost:3000](http://localhost:3000) باز کن.

برای ساخت نسخه‌ی نهایی:

```bash
npm run build
npm start
```

## کجا محتوا را ویرایش کنم؟

تمام متن‌ها، شماره‌ها و لینک‌ها در یک فایل متمرکز هستند:

> **`content/site.ts`**

برای تغییر متن «درباره من»، اطلاعات تماس، شعار و... فقط همین فایل را ویرایش کن — نیازی به دست‌زدن به کد بخش‌ها نیست.

### کارهایی که قبل از انتشار واقعی لازم است:

- [ ] شماره‌ی تلفن و واتس‌اپ واقعی در `content/site.ts` (فیلدهای `phone`, `phoneHref`, `whatsappHref`)
- [ ] لینک و آی‌دی واقعی اینستاگرام (`instagramHref`, `instagramHandle`)
- [ ] قراردادن عکس دکتر در پوشه‌ی `public/` و گذاشتن مسیرش در `about.photo` (مثلاً `"/doctor.jpg"`)
- [ ] جایگزینی لوگوی placeholder در `components/Logo.tsx` با فایل اصلی لوگو

## رنگ‌ها و فونت‌ها

پالت رنگ برند در `tailwind.config.ts` تعریف شده: `primary`, `deep`, `soft`, `gold`, `cream`, `darktext`.
فونت‌ها: Vazirmatn (بدنه)، Peyda (تیتر)، Cormorant Garamond (لاتین).

## انتشار روی Vercel

۱. کد را روی یک ریپوی گیت‌هاب push کن:

```bash
git init
git add .
git commit -m "initial website"
git branch -M main
git remote add origin <آدرس ریپو>
git push -u origin main
```

۲. وارد [vercel.com](https://vercel.com) شو → **Add New → Project** → ریپو را Import کن. Vercel پروژه‌ی Next.js را خودکار تشخیص می‌دهد؛ فقط **Deploy** را بزن.

یا با CLI:

```bash
npm i -g vercel
vercel
```

## افزودن بخش جدید در آینده (مثلاً «خدمات»)

۱. داده‌ی بخش را به `content/site.ts` اضافه کن.
۲. یک کامپوننت تازه در `components/` بساز (از روی `WhyUs.tsx` الگو بگیر).
۳. آن را در `app/page.tsx` بین سکشن‌ها قرار بده و یک لینک به آرایه‌ی `nav` در `site.ts` اضافه کن.
