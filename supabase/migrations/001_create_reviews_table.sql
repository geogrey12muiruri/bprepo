-- Create reviews table for guest reviews with Cloudinary image URLs
create table reviews (
  id text primary key,
  author text not null,
  initials text,
  rating integer not null check (rating >= 1 and rating <= 5),
  date text,
  trip text not null,
  text text not null,
  images text[],
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (optional - for authenticated writes)
alter table reviews enable row level security;

-- Policy: Allow read access to everyone
create policy "reviews are readable by everyone"
  on reviews for select
  using (true);

-- Policy: Allow insert (for anonymous submissions)
-- In production, you may want to restrict this with rate limiting or auth
create policy "reviews can be inserted by anyone"
  on reviews for insert
  with check (true);