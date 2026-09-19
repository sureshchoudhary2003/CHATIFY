import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound, isDrawerOpen, setIsDrawerOpen } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="px-4 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {/* AVATAR */}
        <div className="relative group flex-shrink-0 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <div className="size-11 rounded-full overflow-hidden ring-2 ring-cyan-500/30">
            <img
              src={selectedImg || authUser?.profilePic || "/avatar.png"}
              alt={authUser?.fullName || "User"}
              className="size-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-white text-[10px] font-medium">Edit</span>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* USERNAME & STATUS */}
        <div className="min-w-0">
          <h3 className="text-slate-100 font-semibold text-sm truncate">
            {authUser?.fullName}
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-1">
        {/* SOUND TOGGLE BTN */}
        <button
          className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors"
          title={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
            toggleSound();
          }}
        >
          {isSoundEnabled ? (
            <Volume2Icon className="size-5" />
          ) : (
            <VolumeOffIcon className="size-5 text-slate-500" />
          )}
        </button>

        {/* LOGOUT BTN */}
        <button
          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800/80 transition-colors"
          title="Log out"
          onClick={logout}
        >
          <LogOutIcon className="size-5" />
        </button>

        {/* DRAWER CLOSE BTN (Mobile only when drawer is active) */}
        {isDrawerOpen && (
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors ml-1"
            title="Close Drawer"
            onClick={() => setIsDrawerOpen(false)}
          >
            <span className="text-xl leading-none">✕</span>
          </button>
        )}
      </div>
    </div>
  );
}
export default ProfileHeader;