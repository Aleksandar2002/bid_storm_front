// src/app/constants/useCases.ts

export const UseCases = {
  // Korisnici i Autentifikacija
  USER_REGISTRATION: 1,
  VERIFY_ACCESS_CODE: 2,
  ME_ENDPOINT: 3,

  // Mesta (Places)
  SEARCH_PLACES: 4,
  FIND_PLACE: 5,
  ADD_PLACE: 6,
  UPDATE_PLACE: 7,
  DELETE_PLACE: 8,

  // Aukcije (Auctions)
  SEARCH_AUCTIONS: 9,
  FIND_AUCTION: 10,
  ADD_AUCTION: 11,
  EDIT_AUCTION: 12,
  DELETE_AUCTION: 13,
} as const;

export type UseCaseId = (typeof UseCases)[keyof typeof UseCases];
