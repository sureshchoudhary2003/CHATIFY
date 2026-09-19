import { MessageSquareIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const NoChatHistoryPlaceholder = ({ name }) => {
  const { sendMessage } = useChatStore();

  const handleQuickSend = (text) => {
    sendMessage({ text, image: null });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 my-auto">
      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 rounded-2xl border border-cyan-500/30 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/5">
        <MessageSquareIcon className="size-8 text-cyan-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Start your conversation with {name}
      </h3>
      <div className="flex flex-col space-y-3 max-w-sm mb-6">
        <p className="text-slate-400 text-xs sm:text-sm">
          No messages yet. Send a greeting to start chatting!
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center max-w-sm">
        <button
          onClick={() => handleQuickSend("👋 Hello!")}
          className="px-3.5 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 rounded-full hover:bg-cyan-500/25 transition-colors cursor-pointer"
        >
          👋 Hello!
        </button>
        <button
          onClick={() => handleQuickSend("🤝 How are you doing?")}
          className="px-3.5 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 rounded-full hover:bg-cyan-500/25 transition-colors cursor-pointer"
        >
          🤝 How are you doing?
        </button>
        <button
          onClick={() => handleQuickSend("📅 Available to chat?")}
          className="px-3.5 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 rounded-full hover:bg-cyan-500/25 transition-colors cursor-pointer"
        >
          📅 Available to chat?
        </button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;