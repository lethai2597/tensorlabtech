/* ---------- team registry ---------- */

export interface TeamMember {
  key: string;
  slug: string;
  avatarUrl: string;
  social: {
    linkedin?: string;
    github?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
  };
  /** Only for core members — link to downloadable CV */
  cvUrl?: string;
}

/**
 * Core team members — shown with full info, social links, and CV download.
 * Update `avatarUrl` and `cvUrl` when real assets are added to /public.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    key: "member-1",
    slug: "member-1",
    avatarUrl: "/images/team/thai.jpg",
    social: {
      facebook: "https://www.facebook.com/lehuythaidotcom.fb/",
    },
    cvUrl: "/images/team/thai-resume.pdf",
  },
  {
    key: "member-2",
    slug: "member-2",
    avatarUrl: "/images/team/dung.jpg",
    social: {
      facebook: "https://www.facebook.com/khongadung",
    },
    cvUrl: "/images/team/dung-resume.pdf",
  },
  {
    key: "member-3",
    slug: "member-3",
    avatarUrl: "/images/team/thai.jpg",
    social: {
      facebook: "https://www.facebook.com/truong.nguyenkhac.374",
    },
    cvUrl: "/images/team/thai-resume.pdf",
  },
  {
    key: "member-4",
    slug: "member-4",
    avatarUrl: "/images/team/thinh.jpeg",
    social: {
      facebook: "https://www.facebook.com/oanquangthinh.230844",
    },
    cvUrl: "/images/team/thinh-resume.pdf",
  },
];

/**
 * Advisors — shown with basic info and social links only.
 */
export const TEAM_ADVISORS: TeamMember[] = [
  {
    key: "nguyen",
    slug: "nguyen",
    avatarUrl: "/images/advisors/a-nguyen.jpg",
    social: {
      facebook: "https://www.facebook.com/nguyen.laptrinhvientv",
    },
  },
  {
    key: "duc",
    slug: "duc",
    avatarUrl: "/images/advisors/a-duc.jpg",
    social: {
      facebook: "https://www.facebook.com/itsddvn58",
    },
  },
  {
    key: "hoang",
    slug: "hoang",
    avatarUrl: "/images/advisors/a-hoang.jpg",
    social: {
      facebook: "https://www.facebook.com/phamminhhoang121296",
    },
  },
];
