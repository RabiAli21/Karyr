# ============================================================
# KARYR — Auth Setup Checklist
# ============================================================

# 1. Install packages (if not already)
npm install @supabase/ssr @supabase/supabase-js

# 2. Environment variables — add to .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# ============================================================
# 3. Supabase Dashboard settings
# ============================================================

# Email OTP (already enabled by default):
#   Authentication → Providers → Email
#   ✓ Enable email provider
#   ✓ "Confirm email" can be OFF (OTP handles it)
#   Turn OFF "Secure email change" if causing issues

# OTP Expiry:
#   Authentication → Email Templates
#   Set OTP expiry to 600 seconds (10 min) — good UX

# Site URL (critical for email links):
#   Authentication → URL Configuration
#   Site URL: https://karyr.com  (or your Vercel URL)
#   Redirect URLs: https://karyr.com/**

# ============================================================
# 4. File structure to create
# ============================================================

# lib/
#   supabase/
#     client.ts        ← browser client
#     server.ts        ← server client + getUserRole()

# middleware.ts        ← root of project (next to package.json)

# app/
#   (auth)/
#     login/
#       page.tsx       ← email input + send OTP
#     verify/
#       page.tsx       ← 6-digit OTP entry
#   onboarding/
#     page.tsx         ← role selector (student/employer/TPO)
#   student/
#     dashboard/
#       page.tsx       ← placeholder (build next)
#   employer/
#     dashboard/
#       page.tsx       ← placeholder
#   college/
#     dashboard/
#       page.tsx       ← placeholder

# ============================================================
# 5. SQL to run in Supabase SQL Editor
# ============================================================
# → Run supabase-schema.sql (provided)

# ============================================================
# 6. Test the full flow
# ============================================================
# 1. Go to /login
# 2. Enter your email → Send OTP
# 3. Check email → enter 6-digit code
# 4. Gets redirected to /onboarding (first time)
# 5. Select role (Student / Employer / Placement Officer)
# 6. Gets redirected to the right dashboard
# 7. Reload — stays on dashboard (session persists)
# 8. Try going to /employer/dashboard as a student → redirected back ✓
