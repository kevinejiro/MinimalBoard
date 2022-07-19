import { toast } from "react-hot-toast";
// interface
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
      toast.error(`${message}, kindly refresh or use firefox browser`);
      // throw new Error(message);
    } else {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    toast.error(`${error}, kindly refresh or use firefox browser`);
  }
};

// Update Ticket
export const updateTicket = async (tickets: Ticket[], status: Status) => {
  let patchObject = { tasks: tickets };
  try {
    let res = await fetch(`http://localhost:5000/${status}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(patchObject),
    });
    if (!res.ok) {
      const message = `An error has occured while update server: ${res.status}`;
      toast.error(`${message}, kindly refresh and try again`);
    }
  } catch (error) {
    toast.error(`${error}, kindly refresh or use firefox browser`);
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
      toast.error(`${message}, kindly refresh or use firefox browser`);
      // throw new Error(message);
    } else {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    toast.error(`${error}, kindly refresh or use firefox browser`);
  }
};
