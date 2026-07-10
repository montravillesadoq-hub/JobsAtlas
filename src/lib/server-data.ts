import { featuredJobs } from "@/lib/content";
import { mockCvSummary, mockProfile } from "@/lib/mock-data";

export async function getProfileData() {
  return {
    profile: mockProfile,
    source: "mock",
  };
}

export async function getCvData() {
  return {
    cv: mockCvSummary,
    source: "mock",
  };
}

export async function getJobsData() {
  return {
    jobs: featuredJobs,
    source: "curated-demo",
  };
}
