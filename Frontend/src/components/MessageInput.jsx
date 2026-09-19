import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-2 sm:p-3 md:p-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex-shrink-0 z-10">
      {imagePreview && (
        <div className="max-w-4xl mx-auto mb-2.5 flex items-center">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-cyan-500/40 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 size-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-500 transition-colors shadow"
              type="button"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* ATTACH IMAGE BUTTON */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors flex-shrink-0 ${
            imagePreview ? "text-cyan-400 border-cyan-500/50 bg-cyan-500/10" : ""
          }`}
          title="Attach image"
        >
          <ImageIcon className="size-5" />
        </button>

        {/* TEXT INPUT */}
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-slate-800/80 border border-slate-700/60 rounded-xl py-2.5 px-4 text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all"
          placeholder="Type a message..."
        />

        {/* SEND BUTTON */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 font-semibold hover:from-cyan-400 hover:to-cyan-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
          title="Send message"
        >
          <SendIcon className="size-5" />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;