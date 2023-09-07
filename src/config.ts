import { ServiceName } from "./types/enums";

export const config = {
  [ServiceName.Student]: "/students",
  [ServiceName.School]: "/schools",

  staleTime: 5 * 60 * 1000, // default: 0
  cacheTime: 5 * 60 * 1000, // default: 5 minutes
} as any;
