import { FaBookmark, FaPaperPlane } from "react-icons/fa";
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
        console.log(error);
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
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <aside className="space-y-4">
      {isBookmarked ? (
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaBookmark className="mr-2" /> Remove Bookmark
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaBookmark className="mr-2" /> Bookmark Property
        </button>
      )}

      <div>
        <h3 className="text-xl font-bold text-center pt-2">
          Share this property:
        </h3>
        <div className="flex gap-3 justify-center pb-5">
          <FacebookShareButton
            url={shareUrl}
            quote={property.name}
            hashtag={`#${property.type}ForRent`}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={property.name}
            hashtags={[`${property.type}ForRent`]}
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>

          <TelegramShareButton url={shareUrl} quote={property.name}>
            <TelegramIcon size={40} round={true} />
          </TelegramShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={property.name}
            body={"Check out this property listing:"}
          >
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
}

export default SideBar;
