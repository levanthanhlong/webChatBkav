import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DOMPurify from "dompurify";
import DoneAllIcon from "@mui/icons-material/DoneAll";
//import toast from "react-hot-toast";

const API_URL = "http://10.2.44.52:8888/api"; //cty
//const API_URL = 'http://127.0.0.1:8888/api'; //home

const DEFAULT_AVATAR = "/avatar/4bbfc078-ad2d-46a8-b023-a1e30992903d.jpg"; // Default avatar URL

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.MessageType === 1;
  const formattedTime = extractTime(message.CreatedAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? `${API_URL}/images${authUser.Avatar}`
    : `${API_URL}/images${selectedConversation?.Avatar || DEFAULT_AVATAR}`;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // Sanitize and format message content
  const sanitizedContent = DOMPurify.sanitize(
    message.Content.replace(/\n/g, "")
  );

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          {!fromMe ? <img alt="User avatar" src={profilePic} /> : ""}
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} pb-2 max-w-xs break-words`}
        style={{ whiteSpace: "pre-wrap" }}
      >
        <span dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        {message.Images && message.Images.length > 0 && (
          <div>
            {message.Images.map((image) => (
              <div key={image._id} className="mt-2">
                <img
                  src={`${API_URL}${image.urlImage}`}
                  alt={image.FileName}
                  className="w-full"
                />
                <a
                  href={`${API_URL}${image.urlImage}`}
                  download={image.FileName}
                  className="text-white underline mt-1 block"
                >
                  <FileDownloadIcon />
                  Tải ảnh: {image.FileName}
                </a>
              </div>
            ))}
          </div>
        )}
        {message.Files && message.Files.length > 0 && (
          <div>
            {message.Files.map((file) => (
              <div key={file._id} className="mt-2">
                <a
                  href={`${API_URL}/${file.urlFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline"
                >
                  <FileDownloadIcon />
                  file: {file.FileName}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {" "}
        {message.isSend === 1 && message.MessageType === 1 ? (
          <DoneAllIcon className="text-blue-800" />
        ) : (
          ""
        )}{" "}
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
