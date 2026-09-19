import { MessageSquareIcon, UsersIcon, SearchIcon, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab, searchTerm, setSearchTerm, chats, allContacts } = useChatStore();

  return (
    <div className="px-4 py-3 space-y-3 flex-shrink-0 border-b border-slate-800/80">
      {/* SEARCH BAR */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search chats or contacts..."
          className="w-full bg-slate-800/70 border border-slate-700/60 rounded-xl py-2 pl-9 pr-8 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>

      {/* TABS */}
      <div className="grid grid-cols-2 p-1 bg-slate-800/50 rounded-xl border border-slate-700/40">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            activeTab === "chats"
              ? "bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
          }`}
        >
          <MessageSquareIcon className="size-4" />
          <span>Chats</span>
          {chats.length > 0 && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                activeTab === "chats"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              {chats.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            activeTab === "contacts"
              ? "bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
          }`}
        >
          <UsersIcon className="size-4" />
          <span>Contacts</span>
          {allContacts.length > 0 && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                activeTab === "contacts"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              {allContacts.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
export default ActiveTabSwitch;