import { MessageSquareIcon, LockIcon, SparklesIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-slate-950/60 relative">
      <div className="max-w-md flex flex-col items-center">
        {/* ICON / ILLUSTRATION */}
        <div className="relative mb-6">
          <div className="size-24 bg-gradient-to-tr from-cyan-600/20 to-cyan-400/10 rounded-3xl border border-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/5 backdrop-blur-sm">
            <MessageSquareIcon className="size-12 text-cyan-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 size-8 bg-cyan-500 rounded-xl flex items-center justify-center shadow-md">
            <SparklesIcon className="size-4 text-slate-950" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-100 mb-3 tracking-tight">
          Chatify for Web
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
          Select a chat or choose a contact from the sidebar to start messaging in real-time.
        </p>

        {/* FEATURE PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs text-slate-300 font-medium">
            ⚡ Instant Delivery
          </span>
          <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs text-slate-300 font-medium">
            🔔 Audio Alerts
          </span>
          <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs text-slate-300 font-medium">
            📷 Image Sharing
          </span>
        </div>
      </div>

      {/* FOOTER ENCRYPTED BADGE */}
      <div className="absolute bottom-6 flex items-center gap-2 text-xs text-slate-500">
        <LockIcon className="size-3.5 text-slate-500" />
        <span>End-to-end encrypted messaging</span>
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;