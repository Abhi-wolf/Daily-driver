import { useEffect, useState } from "react";
import { useUser } from "../config/userContext";
import { useForm } from "react-hook-form";
import { addBookMark } from "../features/todo";

function AddBookmark() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { bookmarkLabels } = useUser();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      link: "",
    },
  });

  async function onSubmit(data) {
    setIsError(false);
    setMessage("");

    try {
      const res = await addBookMark(data);

      console.log("bookmark = ", res);
      if (res.status === 200) {
        setMessage("Bookmark added successfully");
        reset();
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const getCurrentTabUrl = async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab && tab.url) {
        setCurrentUrl(tab.url);
        reset({ link: tab.url });
      }
    };

    getCurrentTabUrl();
  }, []);

  return (
    <div className="w-[350px] bg-gray-100 rounded-lg flex flex-col justify-around h-[320px] p-2">
      <h1 className="text-lg text-gray-500 font-semibold">Add To Read Later</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 min-w-full">
          <label htmlFor="link" className="text-sm text-left">
            URL
          </label>
          <input
            type="text"
            {...register("link")}
            placeholder="Enter your url link"
            className="bg-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.link && (
            <p className="text-xs text-red-500">{errors.link.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 min-w-full">
          <label htmlFor="link" className="text-sm text-left">
            BookMark Label
          </label>

          <select
            id="bookmarkLabel"
            {...register("bookmarkLabel")}
            className="bg-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {bookmarkLabels?.map((item) => (
              <option value={item.labelName} key={item._id}>
                {item.labelName}
              </option>
            ))}

            <option value="bookmarks">bookmarks</option>
          </select>
        </div>

        <button
          disabled={isLoading}
          className="bg-gray-400 hover:bg-purple-500 rounded-md py-2 mt-2 text-sm font-medium transition-colors"
        >
          {isLoading ? "Please wait ..." : "Save Chnages"}
        </button>
        <p
          className={`${
            isError ? "text-red-400" : "text-green-400"
          } text-sm w-full text-center`}
        >
          {message}
        </p>
      </form>
    </div>
  );
}

export default AddBookmark;
