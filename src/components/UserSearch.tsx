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
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Search User
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
          <DialogTitle className="text-xl font-bold mb-4">
            Enter your Anilist username
          </DialogTitle>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
            placeholder="Username"
          />
          <div className="flex justify-end">
            <DialogClose asChild>
              <button
                onClick={() => onSearch(username)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
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
