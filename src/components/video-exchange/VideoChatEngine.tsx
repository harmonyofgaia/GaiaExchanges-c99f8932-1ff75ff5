import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Send, Smile } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatMessage {
  id: string;
  content: string;
  user: "current-user" | "other-user";
  timestamp: string;
  type: "text" | "image";
  reactions: { icon: string; count: number }[];
  sender: string;
  replyingTo?: {
    id: string;
    content: string;
    user: "current-user" | "other-user";
  };
}

export function VideoChatEngine() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [replyingTo, setReplyingTo] = useState<ChatMessage | undefined>(undefined);

  const handleSendMessage = useCallback((content: string, replyingTo?: ChatMessage) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString()
      content,
      user: "current-user",
      timestamp: new Date().toISOString(),
      type: "text",
      reactions: [],
      sender: "current-user",
      replyingTo: replyingTo
        ? {
            id: replyingTo.id,
            content: replyingTo.content,
            user: replyingTo.user,
          }
        : undefined,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input, replyingTo);
      setInput("");
      setReplyingTo(undefined);
    }
  };

  const handleReply = (message: ChatMessage) => {
    setReplyingTo(message);
  };

  const clearReply = () => {
    setReplyingTo(undefined);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Video Chat</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 flex flex-col ${message.user === "current-user" ? "items-end" : "items-start"}`}
          >
            {message.replyingTo && (
              <div className="mb-1 p-2 bg-gray-100 rounded-md text-sm">
                Replying to {message.replyingTo.user}: {message.replyingTo.content}
              </div>
            )}
            <div
              className={`rounded-lg p-3 max-w-xs break-words ${message.user === "current-user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              {message.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {/* Reply Context */}
      {replyingTo && (
        <div className="p-4 bg-gray-100 border-t">
          <p className="text-sm">
            Replying to: {replyingTo.content}
            <button onClick={clearReply} className="ml-2 text-blue-500">
              Cancel
            </button>
          </p>
        </div>
      )}

      {/* Chat Input */}
      <Card className="border-none shadow-md">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex items-center p-4">
            <Avatar className="mr-2 w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Your Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              className="rounded-full py-2 px-4 flex-grow border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2 p-2 rounded-full hover:bg-gray-200">
                  <Smile className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>😀 Smile</DropdownMenuItem>
                <DropdownMenuItem>😂 Laugh</DropdownMenuItem>
                <DropdownMenuItem>😢 Cry</DropdownMenuItem>
                <DropdownMenuItem>😡 Angry</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              type="submit"
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
