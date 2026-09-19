import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, selectedUser, setSelectedUser, searchTerm } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  const filteredChats = chats.filter((chat) =>
    chat.fullName?.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  if (filteredChats.length === 0 && searchTerm) {
    return (
      <div className="text-center py-8 px-4 text-slate-400 text-sm">
        No conversations found matching "{searchTerm}"
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {filteredChats.map((chat) => {
        const isSelected = selectedUser?._id === chat._id;
        const isOnline = onlineUsers.includes(chat._id);

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={`p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 relative ${
              isSelected
                ? "bg-cyan-500/15 border-l-4 border-cyan-500 text-white shadow-sm"
                : "hover:bg-slate-800/70 text-slate-300"
            }`}
          >
            {/* AVATAR WITH ONLINE BADGE */}
            <div className="relative flex-shrink-0">
              <div className={`size-12 rounded-full overflow-hidden ring-2 ${
                isSelected ? "ring-cyan-500" : "ring-slate-700"
              }`}>
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="size-full object-cover"
                />
              </div>
              <span
                className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-slate-900 ${
                  isOnline ? "bg-emerald-500" : "bg-slate-500"
                }`}
              />
            </div>

            {/* CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-slate-100 truncate">
                  {chat.fullName}
                </h4>
                <span className="text-[11px] text-slate-400">
                  {isOnline ? "Online" : ""}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {isOnline ? "Active now" : "Tap to message"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ChatsList;