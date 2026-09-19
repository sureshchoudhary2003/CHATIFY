import { ArrowLeftIcon, MessageSquareIcon, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser, setIsDrawerOpen } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = selectedUser ? onlineUsers.includes(selectedUser._id) : false;

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  if (!selectedUser) return null;

  return (
    <div className="h-16 flex-shrink-0 px-3 md:px-6 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-10">
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {/* BACK BUTTON (MOBILE ONLY) */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-2 -ml-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-lg transition-colors flex items-center gap-1"
          title="Back to chats"
        >
          <ArrowLeftIcon className="size-5" />
        </button>

        {/* USER AVATAR */}
        <div className="relative flex-shrink-0">
          <div className="size-10 md:size-11 rounded-full overflow-hidden ring-2 ring-slate-700">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-full object-cover"
            />
          </div>
          <span
            className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-slate-900 ${
              isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-500"
            }`}
          />
        </div>

        {/* USER INFO */}
        <div className="min-w-0">
          <h3 className="text-slate-100 font-semibold text-sm md:text-base truncate">
            {selectedUser.fullName}
          </h3>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <span
              className={`size-1.5 rounded-full ${
                isOnline ? "bg-emerald-500" : "bg-slate-500"
              }`}
            />
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* HEADER ACTIONS */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* MOBILE DRAWER TOGGLE */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
          title="Open chats drawer"
        >
          <MessageSquareIcon className="size-5" />
        </button>

        {/* CLOSE CHAT BUTTON */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Close chat"
        >
          <XIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
export default ChatHeader;