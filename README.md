# WearTrack Pro - Clothing Brand Management Software

Next.js 14 / React ভিত্তিক ক্লোথিং ব্র্যান্ডের সাইজ অনুযায়ী ইনভেন্টরি, দৈনিক অর্ডার, কুরিয়ার ইন-ট্রানজিট ও রিটার্ন ট্র্যাকিং সফটওয়্যার।

---

## ১. লোকাল কম্পিউটারে রান করার নিয়ম:
1. জিপ ফাইলটি আনজিপ করুন।
2. ফোল্ডারে টার্মিনাল ওপেন করে কমান্ড দিন:
   ```bash
   npm install
   npm run dev
   ```
3. ব্রাউজারে `http://localhost:3000` ওপেন করুন।

---

## ২. Vercel-এ ১-ক্লিকে ফ্রি ডিপ্লয় (সবচেয়ে সহজ):
1. প্রজেক্ট ফোল্ডারটি আপনার [GitHub](https://github.com)-এ একটি নতুন রিপোজিটরিতে পুশ করুন:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. [Vercel](https://vercel.com)-এ লগইন করুন এবং **"Add New Project"** সিলেক্ট করুন।
3. আপনার GitHub রিপোজিটরি সিলেক্ট করে **"Deploy"** বাটনে ক্লিক করুন।
4. মাত্র ১ মিনিটে আপনার সফটওয়্যারটি নিজস্ব ফ্রি ডোমেইনে লাইভ হয়ে যাবে। পরবর্তীতে আপনার কাস্টম ডোমেইন (যেমন: `app.yourbrand.com`) কানেক্ট করতে পারবেন।

---

## ৩. cPanel হোস্টিংয়ে ডিপ্লয় (Shared Hosting):
1. cPanel-এ লগইন করে **"Setup Node.js App"** এ যান।
2. **"Create Application"** ক্লিক করুন:
   - Node.js Version: `18.x` বা `20.x` সিলেক্ট করুন।
   - Application Mode: `Production`
   - Application Root: ফোল্ডারের নাম (যেমন: `weartrack`)
   - Application URL: আপনার সাবডোমেন বা ডোমেন
3. cPanel File Manager দিয়ে জিপ ফাইলটির সমস্ত ফাইল ঐ ফোল্ডারে আপলোড করে এক্সট্র্যাক্ট করুন।
4. cPanel Node.js পেজে এসে **"Run NPM Install"** বাটনে ক্লিক করুন।
5. টার্মিনালে বা স্ক্রিপ্টে `npm run build` রান করে অ্যাপটি রিস্টার্ট করুন।

---

## ৪. VPS / Cloud সার্ভারে ডিপ্লয় (Ubuntu / Nginx + PM2):
```bash
git clone <your-repo-url>
cd weartrack
npm install
npm run build
npm install -g pm2
pm2 start npm --name "weartrack" -- start
pm2 save
pm2 startup
```
