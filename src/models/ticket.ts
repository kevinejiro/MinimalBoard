export type Status = "todos" | "inprogress" | "completed";

export interface Ticket {
  id: string;
  task: string;
  status: Status;
}

export interface ITicketList {
  tickets: Ticket[];
  column: Status;
}
