const SUPABASE_URL = 'https://havmduragglvstlxrgag.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhdm1kdXJhZ2dsdnN0bHhyZ2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjM5NDksImV4cCI6MjA5NDMzOTk0OX0.HqyIk3BN6pKu6cqYJvo-naVB3H6C6P3brQmnHMGlB-Q';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Tables ready: waitlist, profiles, videos
