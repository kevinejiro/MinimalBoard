export interface Ticket {
  id: string;
  task: string;
  status: "todo" | "inprogress" | "completed";
}
