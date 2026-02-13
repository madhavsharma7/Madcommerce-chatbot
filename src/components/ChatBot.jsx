import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { supabase } from "../backend/supabaseClient";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Fetch initial messages from Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (data && !error) {
        setMessages(data);
      }
    };

    if (open) {
      fetchMessages();
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const saveMessage = async (msg) => {
    try {
      await supabase.from('messages').insert([msg]);
    } catch (error) {
      console.error("Error saving to Supabase:", error);
    }
  };

  const handleClearChat = async () => {
    if (window.confirm("Are you sure you want to clear the entire chat history?")) {
      try {
        const { error } = await supabase
          .from('messages')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000'); // Standard way to delete all in Supabase

        if (!error) {
          setMessages([]);
        } else {
          console.error("Error clearing context:", error);
        }
      } catch (error) {
        console.error("Catch error clearing messages:", error);
      }
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Persist user message
    await saveMessage(userMsg);

    // Simulate network delay for realistic experience
    setTimeout(async () => {
      let response = "I'm sorry, I didn't quite catch that. Could you please rephrase?";

      const lowerText = text.toLowerCase();
      if (lowerText.includes("hi") || lowerText.includes("hello")) {
        response = "Hello! 👋 Welcome to **Mad Commerce**. How can I help you find the perfect product today?";
      } else if (lowerText.includes("product") || lowerText.includes("item")) {
        response = "We have a wide range of products across Categories like **Men's Fashion**, **Women's Fashion**, **Jewellery**, and **Electronics**. Is there a specific category you're interested in?";
      } else if (lowerText.includes("price") || lowerText.includes("cost")) {
        response = "Our prices are very competitive! We curate only the best quality items at the best price points for our customers. 💸";
      } else if (lowerText.includes("ship") || lowerText.includes("delivery")) {
        response = "We offer **Free Shipping** on orders over $50! Standard delivery typically takes 3-5 business days.";
      } else if (lowerText.includes("return") || lowerText.includes("refund")) {
        response = "We have a hassle-free 30-day return policy. If you're not satisfied, we'll make it right!";
      }

      const assistantMsg = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);

      // Persist assistant message
      await saveMessage(assistantMsg);
    }, 800);
  };


  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-110 transition-transform"
        aria-label="Toggle chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            style={{ height: "480px" }}
          >
            <div className="flex items-center justify-between bg-primary px-4 py-3">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">Mad Commerce Assistant</p>
                  <p className="text-xs text-primary-foreground/70">Ask me anything about products</p>
                </div>
              </div>
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-white/10 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">
                  👋 Hi! How can I help you today?
                </p>
              )}
              {messages.map((msg, i) => (
                <div key={msg.id || i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"
                      }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none prose-neutral">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white border border-gray-200 shadow-sm px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled={isLoading}
                />
                <button
                  onClick={send}
                  disabled={isLoading || !input.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
