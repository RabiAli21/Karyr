-- ============================================
-- KARYR — SUPABASE DATABASE SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. PROFILES TABLE
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  role text check (role in ('student', 'employer', 'college')),
  phone text,
  city text,
  headline text,
  skills text[],
  college text,
  course text,
  grad_year int,
  preferred_role text,
  company text,
  company_website text,
  company_about text,
  recruiter_name text,
  resume_url text,
  created_at timestamptz default now()
);

-- 2. JOBS TABLE
create table if not exists jobs (
  id uuid default gen_random_uuid() primary key,
  employer_id uuid references profiles(id) on delete cascade,
  company text not null,
  title text not null,
  type text not null,
  location text,
  location_type text default 'On-site',
  pay text,
  pay_type text,
  openings int default 1,
  description text,
  requirements text,
  skills text[],
  deadline date,
  status text default 'active',
  created_at timestamptz default now()
);

-- 3. APPLICATIONS TABLE
create table if not exists applications (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references profiles(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  status text default 'applied' check (status in ('applied','shortlisted','interview','hired','rejected')),
  applied_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(student_id, job_id)
);

-- 4. COLLEGE STUDENTS TABLE (students added by college admins)
create table if not exists college_students (
  id uuid default gen_random_uuid() primary key,
  college_id uuid references profiles(id) on delete cascade,
  name text not null,
  email text not null,
  course text,
  grad_year int,
  city text,
  created_at timestamptz default now()
);

-- 5. ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table jobs enable row level security;
alter table applications enable row level security;
alter table college_students enable row level security;

-- Profiles: users can read all, only update own
create policy "Public profiles are viewable" on profiles for select using (true);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Jobs: everyone can read active, employers manage own
create policy "Active jobs are viewable" on jobs for select using (status = 'active' or employer_id = auth.uid());
create policy "Employers can insert jobs" on jobs for insert with check (employer_id = auth.uid());
create policy "Employers can update own jobs" on jobs for update using (employer_id = auth.uid());
create policy "Employers can delete own jobs" on jobs for delete using (employer_id = auth.uid());

-- Applications: students see own, employers see for their jobs
create policy "Students see own applications" on applications for select using (student_id = auth.uid());
create policy "Students can apply" on applications for insert with check (student_id = auth.uid());
create policy "Students can withdraw" on applications for delete using (student_id = auth.uid());
create policy "Employers see their job applications" on applications for select using (
  exists (select 1 from jobs where jobs.id = applications.job_id and jobs.employer_id = auth.uid())
);
create policy "Employers can update application status" on applications for update using (
  exists (select 1 from jobs where jobs.id = applications.job_id and jobs.employer_id = auth.uid())
);

-- College students: colleges manage own
create policy "Colleges manage own students" on college_students for all using (college_id = auth.uid());

-- 6. TRIGGER: auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
