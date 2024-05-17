"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";

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
    <div className="relative bg-teaGreen p-4 rounded-md shadow-md border border-gray flex justify-between flex-col sm:flex-row">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-slateBlue text-teaGreen px-2 py-1 mx-2 rounded-md">
          New
        </div>
      )}
      <div>
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry: </span>
          {message.property.name}
        </h2>
        <p className="text-gray">{message.body}</p>

        <ul className="mt-4">
          <li>
            <strong>Name:</strong> {message.sender.username}
          </li>

          <li>
            <strong>Reply Email: </strong>
            <a href={`mailto:${message.email}`} className="text-slateBlue">
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone: </strong>
            <a href={`tel:${message.phone}`} className="text-slateBlue">
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
        <button
          onClick={handleReadClick}
          className={`${
            isRead
              ? "mt-4 py-1 px-3 rounded-md text-gray bg-cosmicLatte flex items-center mb-3"
              : "mt-4 py-1 px-3 rounded-md text-teaGreen bg-persianGreen flex items-center mb-3"
          }`}
        >
          {isRead ? "Mark As New" : "Mark As Read"}
        </button>
        <button
          onClick={handleDeleteClick}
          className="mt-4 bg-red text-teaGreen py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Message;
