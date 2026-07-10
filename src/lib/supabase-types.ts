export type ProfileRow = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  location: string;
  plan: string;
  profile_completion: number;
  created_at: string;
};

export type CvRow = {
  id: string;
  user_id: string;
  title: string;
  status: string;
  ats_score: number;
  last_updated: string;
  content: string;
  created_at: string;
};

export type JobRow = {
  id: string;
  title: string;
  company: string;
  country: string;
  city: string;
  sector: string;
  contract_type: string;
  experience_level: string;
  salary: string | null;
  description: string;
  skills: string[];
  official_url: string;
  source: string;
  published_at: string;
  created_at: string;
};

export type PaymentRow = {
  id: string;
  user_id: string;
  plan: "Gratuit" | "Standard" | "Premium" | "Professionnel";
  amount: number;
  receipt_url: string;
  status: "pending" | "approved" | "rejected";
  admin_note: string | null;
  created_at: string;
};

export type ApplicationRow = {
  id: string;
  user_id: string;
  job_id: string;
  status: "saved" | "generated" | "sent" | "interview" | "rejected" | "accepted";
  notes: string | null;
  created_at: string;
};
