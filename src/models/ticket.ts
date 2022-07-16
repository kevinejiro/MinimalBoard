export type Status = "todo" | "inprogress" | "completed";

export interface Ticket {
  id: string;
  task: string;
  status: Status;
}
