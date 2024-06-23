import { useEffect, useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = ({ search }) => {
  const { loading: fetchLoading } = useGetConversations(); // only to trigger data fetch
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [nicknames, setNicknames] = useState({});

  useEffect(() => {
    const storedConversations = localStorage.getItem("conversations");
    const storedNicknames = localStorage.getItem("nicknames");
    
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }
    
    if (storedNicknames) {
      setNicknames(JSON.parse(storedNicknames));
    }

    setLoading(false);

    const interval = setInterval(() => {
      const updatedConversations = localStorage.getItem("conversations");
      const updatedNicknames = localStorage.getItem("nicknames");

      if (updatedConversations) {
        setConversations(JSON.parse(updatedConversations));
      }

      if (updatedNicknames) {
        setNicknames(JSON.parse(updatedNicknames));
      }
    }, 1000); // Update every 1 second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleNicknameChange = (friendId, nickname) => {
    const updatedNicknames = { ...nicknames, [friendId]: nickname };
    setNicknames(updatedNicknames);
    localStorage.setItem("nicknames", JSON.stringify(updatedNicknames));
  };

  // Filter out conversations with null or undefined FullName
  // and sort the rest by FriendID
  const filteredConversations = conversations
    .filter((conversation) => conversation.FullName)
    .filter((conversation) =>
      search
        ? String(conversation.FullName)
            .toLowerCase()
            .includes(search.toLowerCase())
        : true
    )
    .sort((a, b) => {
      const idA = a.FriendID;
      const idB = b.FriendID;
      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
    });

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredConversations.map((conversation, idx) => (
        <Conversation
          key={conversation.FriendID}
          conversation={conversation}
          lastIdx={idx === filteredConversations.length - 1}
          nickname={nicknames[conversation.FriendID] || conversation.FullName}
          onNicknameChange={handleNicknameChange}
        />
      ))}

      {loading || fetchLoading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
