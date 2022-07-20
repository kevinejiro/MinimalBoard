import { toast } from "react-hot-toast";
// interface and type
import { Ticket, Status } from "../models/ticket";

const headers = {
  "Content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

// fetch all tickets
export const fetchAllTickets = async (url: RequestInfo | URL) => {
  try {
    let res = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      toast.error(`${message}, kindly refresh`);
      // throw new Error(message);
    } else {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    toast.error(`${error}, kindly refresh`);
  }
};

// Update Ticket
export const updateTicket = async (tickets: Ticket[], status: Status) => {
  let patchObject = { tasks: tickets };
  try {
    let res = await fetch(`http://localhost:4000/${status}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(patchObject),
    });
    if (!res.ok) {
      const message = `An error has occured while updating server: ${res.status}`;
      toast.error(`${message}, kindly refresh and try again`);
    }
  } catch (error) {
    toast.error(`${error}, kindly refresh and try again`);
  }
};

export const fetchSingleTicket = async (url: RequestInfo | URL) => {
  try {
    let res = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      toast.error(`${message}, kindly refresh`);
      // throw new Error(message);
    } else {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    toast.error(`${error}, kindly refresh`);
  }
};
