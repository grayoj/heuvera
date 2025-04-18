export interface FormInfo {
  // Step 1
  phoneNumber: string;
  bio: string;
  governmentId: string;
  idVerificationStatus: string;

  // Step 2
  businessName: string;
  businessLogo: string;
  businessRegNumber: string;
  businessAddress: string;

  // Step 3
  socialMediaLinks: {
    instagram: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    tiktok: string;
  };
  hostRatings: number;
  asBusiness: boolean;
}
