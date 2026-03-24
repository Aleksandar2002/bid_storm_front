export type User = {
  id: number;
  email: string;
  username: string;

  // Personal Data
  firstName: string;
  lastName: string;

  // Address & Contact
  street: string;
  streetNumber: number;
  phoneNumber: string;

  // Location details
  placeId: number;
  placeName: string;
  fullName: string;

  negativeReviewsCount: number;
  positiveReviewsCount: number;
  memberFrom: Date;
};

export type UserMiniDto = {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  image?: string;
};
