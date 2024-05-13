"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";
import LinkButton from "./LinkButton";

function Message({ message }) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  async function handleReadClick() {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));

        if (read) {
          toast.success("Marked as read");
        } else {
          toast.success("Marked as new");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function handleDeleteClick() {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success("Message deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Message was not deleted");
    }
  }

  if (isDeleted) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200 flex justify-between flex-col sm:flex-row">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-teaGreen text-gray px-2 py-1 mx-2 rounded-md">
          New
        </div>
      )}
      <div>
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry: </span>
          {message.property.name}
        </h2>
        <p className="text-gray-700">{message.body}</p>

        <ul className="mt-4">
          <li>
            <strong>Name:</strong> {message.sender.username}
          </li>

          <li>
            <strong>Reply Email: </strong>
            <a href={`mailto:${message.email}`} className="text-blue-500">
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone: </strong>
            <a href={`tel:${message.phone}`} className="text-blue-500">
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Received: </strong>
            {new Date(message.createdAt).toLocaleString()}
          </li>
        </ul>
      </div>
      <div className="py-5 flex flex-col">
        <LinkButton
          onClick={handleReadClick}
          type={`${isRead ? "read" : "new"}`}
        >
          {isRead ? "Mark As New" : "Mark As Read"}
        </LinkButton>
        <LinkButton onClick={handleDeleteClick} type="delete">
          Delete
        </LinkButton>
      </div>
    </div>
  );
}

export default Message;
