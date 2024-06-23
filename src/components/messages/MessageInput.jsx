import { useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const { loading, sendMessage } = useSendMessage();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const isSubmitting = useRef(false);
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return;
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    toast.success("Sending message...");
    await sendMessage(message, file);
    setMessage("");
    setFile(null);
    setIsEmojiPickerOpen(false);
    isSubmitting.current = false;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    toast.success("File selected");
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      const cursorPosition = textareaRef.current.selectionStart;
      const newMessage =
        message.slice(0, cursorPosition) + "\n" + message.slice(cursorPosition);
      setMessage(newMessage);
      requestAnimationFrame(() => {
        const newCursorPosition = cursorPosition + 1;
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative flex gap-4 justify-center items-center">
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <AddCircleOutlineIcon />
        </button>
        <div className="w-full flex gap-4">
          <textarea
            ref={textareaRef}
            className="border text-sm rounded-lg block p-2.5 bg-gray-100 border-gray-600 text-black w-95/100 resize-none"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            type="button"
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
          >
            <InsertEmoticonIcon />
          </button>
          {isEmojiPickerOpen && (
            <div className="absolute bottom-12 right-0 z-10">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <button type="submit" className="">
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
