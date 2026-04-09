export type EventItem = {
  slug: string;
  title: string;
  date: string;
  location: string;
  type: "Reunion" | "Webinar" | "Talk" | "Meetup";
  excerpt: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
};

export type AlumnusItem = {
  name: string;
  batch: string;
  branch: string;
  role: string;
  company: string;
  city: string;
};

export const events: EventItem[] = [
  {
    slug: "annual-reunion-2026",
    title: "Annual Alumni Reunion 2026",
    date: "2026-12-19",
    location: "IIIT Lucknow Campus, Chak Ganjaria",
    type: "Reunion",
    excerpt:
      "Join us on campus for the flagship annual reunion — talks, tours, batch dinners, and the alumni awards night.",
  },
  {
    slug: "founders-fireside-bengaluru",
    title: "Founders Fireside — Bengaluru",
    date: "2026-05-24",
    location: "Bengaluru, India",
    type: "Meetup",
    excerpt:
      "An intimate evening with IIITL founders building across SaaS, fintech, and AI. Featuring lightning talks and Q&A.",
  },
  {
    slug: "webinar-research-careers",
    title: "Webinar: Pursuing a Research Career After IIITL",
    date: "2026-04-27",
    location: "Online",
    type: "Webinar",
    excerpt:
      "PhD students and postdocs from CMU, ETH Zurich, and IISc share how they navigated grad school applications.",
  },
];

export const news: NewsItem[] = [
  {
    slug: "alumni-fund-launch",
    title: "Alumni-led ₹1 Cr fund launched for student innovation",
    date: "2026-03-30",
    category: "Announcement",
    excerpt:
      "The IIITL Alumni Innovation Fund will support student-led prototypes and early-stage ideas across batches.",
  },
  {
    slug: "founders-club",
    title: "Founders Club crosses 50 alumni-built startups",
    date: "2026-03-12",
    category: "Spotlight",
    excerpt:
      "From YC-backed AI startups to bootstrapped fintech, the IIITL Founders Club now spans every major hub.",
  },
  {
    slug: "global-meetup-week",
    title: "Global Meetup Week brings IIITL alumni together in 12 cities",
    date: "2026-02-22",
    category: "Community",
    excerpt:
      "A weeklong wave of alumni meetups across India, the US, the UK, and Singapore — organized entirely by volunteers.",
  },
];

export const featuredAlumni: AlumnusItem[] = [
  {
    name: "Aarav Mehta",
    batch: "2019",
    branch: "CSE",
    role: "Senior Software Engineer",
    company: "Google",
    city: "Bengaluru",
  },
  {
    name: "Ishita Verma",
    batch: "2018",
    branch: "IT",
    role: "Product Manager",
    company: "Atlassian",
    city: "Sydney",
  },
  {
    name: "Rohan Singh",
    batch: "2020",
    branch: "ECE",
    role: "PhD Researcher",
    company: "ETH Zurich",
    city: "Zurich",
  },
  {
    name: "Priya Nair",
    batch: "2017",
    branch: "CSE",
    role: "Co-founder & CTO",
    company: "Lumen AI",
    city: "San Francisco",
  },
];

export const jobs: {
  title: string;
  company: string;
  location: string;
  type: string;
  postedBy: string;
}[] = [
  {
    title: "Founding Engineer",
    company: "Lumen AI",
    location: "Remote",
    type: "Full-time",
    postedBy: "Priya Nair, '17",
  },
  {
    title: "Backend Engineer Intern",
    company: "Razorpay",
    location: "Bengaluru",
    type: "Internship",
    postedBy: "Aarav Mehta, '19",
  },
  {
    title: "ML Research Engineer",
    company: "Sarvam AI",
    location: "Bengaluru",
    type: "Full-time",
    postedBy: "Karan Gupta, '18",
  },
];
