import React, { useState } from "react";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MainContainer,
  TypingIndicator,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./Chat.css";

const Chat = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! I'm Smart Saver, an AI assistant. How can I help you today?",
      sender: "Smart Saver",
      direction: "incoming",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    setMessages([...messages, newMessage]);
    setTyping(true);

    await processMessageToChatGPT(message);
  };

  async function processMessageToChatGPT(userMessage) {
    const apiMessages = messages.map((msg) => ({
      role: msg.sender === "Smart Saver" ? "assistant" : "user",
      content: msg.message,
    }));

    const systemMessage = {
      role: "system",
      content:
        "You are smart home devices specialist. Your answers must be very short maximum 40 words, and language should be simple and use uk dictionary ",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo-1106",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      const data = await response.json();
      console.log(data);

      const aiResponseMessage = data.choices[0].message.content;
      const aiResponse = {
        message: aiResponseMessage,
        sender: "Smart Saver",
        direction: "incoming",
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error in processing message to ChatGPT:", error);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="chat-container">
      <MainContainer className="chat-box">
        <ChatContainer className="chat-message">
          <ConversationHeader>
            <ConversationHeader.Content userName="Smart Home Saver Chat" />
          </ConversationHeader>
          <MessageList
            typingIndicator={
              typing ? (
                <TypingIndicator content="Smart Saver is typing" />
              ) : null
            }
          >
            {messages.map((msg, i) => (
              <Message key={i} model={{ ...msg, direction: msg.direction }} />
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
