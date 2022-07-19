// import {toast} from 'react-hot-toast'
// interface
import { Ticket, Status } from "../models/ticket";

// fetch all tickets
export const fetchAllTickets = async (url: RequestInfo | URL) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const data = await res.json();
  return data;
};

// Update Ticket
export const updateTicket = async (tickets: Ticket[], status: Status) => {
  let patchObject = { tasks: tickets };
  // if (status === "todo") {
  //   patchObject = [...tickets] ;
  // } else if (status === "inprogress") {
  //   patchObject = { inprogress: tickets };
  // } else if (status === "completed") {
  //   patchObject = { completed: tickets };
  // }

  const res = await fetch(`http://localhost:5000/${status}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(patchObject),
  });

  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }

  const data = await res.json();
  console.log("data :", data);
};

export const fetchSingleTicket = async (url: RequestInfo | URL) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const data = await res.json();
  return data;
};
