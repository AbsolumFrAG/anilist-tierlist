import { FC, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface UserSearchProps {
  onSearch: (username: string) => void;
}

export const UserSearch: FC<UserSearchProps> = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
          Search User
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 dark:bg-black/70" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg">
          <DialogTitle className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Enter your Anilist username
          </DialogTitle>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white 
                       border-gray-300 dark:border-gray-600 
                       focus:border-blue-500 dark:focus:border-blue-400 
                       focus:ring-blue-500 dark:focus:ring-blue-400
                       placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Username"
          />
          <div className="flex justify-end">
            <DialogClose asChild>
              <button
                onClick={() => onSearch(username)}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
