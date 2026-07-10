import type { TAdmin } from "./admin.types";

export type TLead = {
  _id: string;
  name: string;
  contact: string;
  details: string;
  lead_source: string;
  status: string;
  assignedTo: TAdmin;
  referredBy?: TAdmin;
  convertedBy?: TAdmin;
  followUps: {
    note?: string;
    doneBy: TAdmin;
    createdAt?: string;
    updatedAt?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
};
