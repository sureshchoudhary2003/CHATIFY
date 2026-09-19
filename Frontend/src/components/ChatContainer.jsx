import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden bg-slate-950 relative">
      <ChatHeader />

      {/* MESSAGES VIEWPORT */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-3 chat-wallpaper">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-4xl mx-auto space-y-3">
            {messages.map((msg) => {
              const isMe = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 group`}
                >
                  <div
                    className={`relative max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 shadow-md transition-all ${
                      isMe
                        ? "bg-gradient-to-br from-cyan-600 to-cyan-700 text-white rounded-tr-xs shadow-cyan-900/20"
                        : "bg-slate-800/90 border border-slate-700/60 text-slate-100 rounded-tl-xs shadow-black/20"
                    }`}
                  >
                    {/* ATTACHED IMAGE */}
                    {msg.image && (
                      <div className="mb-2 overflow-hidden rounded-xl bg-black/20">
                        <img
                          src={msg.image}
                          alt="Shared attachment"
                          className="max-h-72 w-full object-cover rounded-xl hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                          onClick={() => window.open(msg.image, "_blank")}
                        />
                      </div>
                    )}

                    {/* MESSAGE TEXT */}
                    {msg.text && (
                      <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    )}

                    {/* TIMESTAMP & STATUS */}
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isMe ? "text-cyan-100/75" : "text-slate-400"
                      }`}
                    >
                      <span>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {isMe && <span className="font-bold text-[11px] leading-none">✓✓</span>}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Scroll Target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <div className="max-w-4xl mx-auto pt-4">
            <MessagesLoadingSkeleton />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;