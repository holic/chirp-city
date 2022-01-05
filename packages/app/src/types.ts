import { DateTime } from "luxon";

export type Chirp = {
  id: string;
  date: DateTime;
  from: string;
  message: string;
};
