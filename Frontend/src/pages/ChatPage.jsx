import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, isDrawerOpen, setIsDrawerOpen } = useChatStore();

  // Sidebar content (used for desktop, mobile recent chats view, and mobile drawer)
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full w-full bg-slate-900">
      <ProfileHeader />
      <ActiveTabSwitch />
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1">
        {activeTab === "chats" ? <ChatsList /> : <ContactList />}
      </div>
    </div>
  );

  return (
    <div className="relative h-[100dvh] w-full flex overflow-hidden bg-slate-950">
      {/* 1. DESKTOP SIDEBAR (Visible on md and above) */}
      <aside className="hidden md:flex w-[340px] lg:w-[380px] xl:w-[420px] flex-shrink-0 flex-col border-r border-slate-800 bg-slate-900 z-20">
        {renderSidebarContent()}
      </aside>

      {/* 2. MOBILE MAIN SIDEBAR (Visible on mobile when no chat is active) */}
      <div
        className={`md:hidden flex flex-col h-full w-full ${
          selectedUser ? "hidden" : "flex"
        }`}
      >
        {renderSidebarContent()}
      </div>

      {/* 3. MAIN CHAT / CONVERSATION PANE */}
      <main
        className={`flex-1 flex flex-col h-full overflow-hidden bg-slate-950 ${
          !selectedUser ? "hidden md:flex" : "flex"
        }`}
      >
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </main>

      {/* 4. MOBILE SLIDE-OVER DRAWER (Visible when inside a chat on mobile and drawer is toggled) */}
      {selectedUser && isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-[85%] max-w-[340px] h-full z-10 shadow-2xl animate-slide-in-left">
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;