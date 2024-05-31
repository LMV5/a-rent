"use client";

import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  EmailIcon,
} from "react-share";

function SideBar({ property }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log("Error checking bookmark status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log("Error bookmarking property:", error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <aside className="flex flex-col my-2">
      {isBookmarked ? (
        <button
          onClick={handleClick}
          className="flex items-center justify-center mx-auto bg-red text-teaGreen text-sm hover:bg-opacity-70 px-4 py-2 rounded-full text-center gap-2"
        >
          <FaBookmark className="mr-2" /> <span>Remove Bookmark</span>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="flex items-center justify-center mx-auto bg-persianGreen text-teaGreen text-sm hover:bg-opacity-70 px-4 py-2 rounded-full text-center gap-2"
        >
          <FaBookmark className="mr-2" /> <span>Bookmark Property</span>
        </button>
      )}

      <div className="py-2">
        <h3 className="text-xl font-bold text-center py-4">
          Share this property:
        </h3>
        <div className="flex gap-3 justify-center pb-6">
          <FacebookShareButton
            url={shareUrl}
            quote={property.name}
            hashtag={`#${property.type}ForRent`}
          >
            <FacebookIcon size={40} round={true} className="hover:opacity-80" />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={property.name}
            hashtags={[`${property.type}ForRent`]}
          >
            <TwitterIcon size={40} round={true} className="hover:opacity-80" />
          </TwitterShareButton>

          <TelegramShareButton url={shareUrl} quote={property.name}>
            <TelegramIcon size={40} round={true} className="hover:opacity-80" />
          </TelegramShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={property.name}
            body={"Check out this property listing:"}
          >
            <EmailIcon size={40} round={true} className="hover:opacity-80" />
          </EmailShareButton>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
