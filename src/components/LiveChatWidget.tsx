import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Database, Check, Bot, User } from 'lucide-react';
import { 
  sendChatMessageToFirestore, 
  subscribeToChatMessages, 
  ChatMessageData 
} from '../lib/firebase';
import { notifyChatMessage } from '../lib/gmail';
import { getStudioChatResponse } from '../lib/chatBotLogic';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [sending, setSending] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [firestoreSynced, setFirestoreSynced] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Subscribe to Firestore Chat collection
  useEffect(() => {
    const unsubscribe = subscribeToChatMessages((firestoreMsgs) => {
      if (firestoreMsgs.length > 0) {
        setMessages(firestoreMsgs);
        setFirestoreSynced(true);
      } else {
        // Initial welcome message if Firestore collection is empty
        setMessages([
          {
            id: 'welcome',
            sender: 'assistant',
            senderName: 'Khondoker Creation',
            text: `আসসালামু আলাইকুম! 👋 খন্দকার ক্রিয়েশন (Khondoker Creation)-এ আপনাকে স্বাগতম। আমি আমাদের স্টুডিও টিম থেকে আপনাকে সাহায্য করতে লাইভে আছি।

গ্রাফিক্স ডিজাইন, ৩ডি মকআপ, ভিডিও এডিটিং, ডিজিটাল মার্কেটিং বা UI/UX ডিজাইন প্রজেক্ট নিয়ে যেকোনো প্রশ্ন থাকলে আমাকে সরাসরি জানাতে পারেন।

আপনাকে কীভাবে সাহায্য করতে পারি বলুন?`,
            createdAt: new Date()
          }
        ]);
        setFirestoreSynced(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const text = (customText || inputText).trim();
    if (!text || sending) return;

    setInputText('');
    setSending(true);

    const userDisplayName = guestName.trim() || 'Client';

    try {
      // Save user message to Firestore
      await sendChatMessageToFirestore({
        sender: 'user',
        senderName: userDisplayName,
        text: text
      });

      // Trigger Gmail Notification SMS/Alert
      notifyChatMessage(userDisplayName, text);

      // Call Gemini 3.6 Flash Server Endpoint
      let replyText = '';
      try {
        const historyPayload = messages.slice(-6).map(m => ({
          sender: m.sender,
          text: m.text
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: text,
            history: historyPayload,
            userDisplayName: userDisplayName
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.replyText) {
            replyText = data.replyText;
          }
        }
      } catch (apiErr) {
        console.warn('Backend /api/chat error, using intelligent local response:', apiErr);
      }

      // Fallback to local intelligence if server API call failed or returned empty
      if (!replyText) {
        const botResponse = getStudioChatResponse(text);
        replyText = botResponse.replyText;
      }

      // Save AI response to Firestore
      await sendChatMessageToFirestore({
        sender: 'assistant',
        senderName: 'Khondoker Creation',
        text: replyText
      });

      setSending(false);
    } catch (err) {
      console.error('Failed to send chat message to Firebase', err);
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#161C28]/95 hover:bg-[#121824] border border-[#00F2FE]/50 text-white font-bold text-xs shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] backdrop-blur-md transition-all scale-100 hover:scale-105 active:scale-95 group"
          id="toggle-live-chat-btn"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#00F2FE] text-black font-extrabold shadow-[0_0_10px_rgba(0,242,254,0.6)]">
            <MessageSquare className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-white">
              <span>Live Studio Support</span>
              <Database className="w-3 h-3 text-[#00F2FE]" />
            </div>
            <p className="text-[10px] text-[#94A3B8] font-normal">Chat with Khondoker Team</p>
          </div>
        </button>
      </div>

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-[#161C28] border border-[#2A3447] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-[#0B0F17] border-b border-[#2A3447] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00F2FE]/15 border border-[#00F2FE]/40 flex items-center justify-center text-[#00F2FE]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-white">Khondoker Creation</h4>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    Online Support
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#00F2FE]">
                  <Database className="w-3 h-3" />
                  <span>Realtime Live Chat</span>
                  {firestoreSynced && <Check className="w-3 h-3 text-emerald-400" />}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-[#161C28] border border-[#2A3447] text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Guest Name Bar */}
          <div className="px-4 py-2 bg-[#121824] border-b border-[#2A3447]/60 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#00F2FE]" />
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0B0F17]/50">
            {messages.map((msg, idx) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id || idx}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] text-gray-400 mb-0.5 px-1 font-mono">
                    {msg.senderName || (isUser ? 'You' : 'Khondoker Creation')}
                  </div>
                  <div
                    className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-[#00F2FE] text-black font-medium rounded-br-none shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                        : 'bg-[#1F293D] text-white border border-[#2A3447] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            {sending && (
              <div className="flex items-center gap-2 text-xs text-[#00F2FE] py-1">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Khondoker Team is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-[#0E131F] border-t border-[#2A3447]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none text-[11px]">
            <button
              type="button"
              onClick={() => handleSendMessage(undefined, "গ্রাফিক্স ডিজাইন & ৩ডি ব্র্যান্ডিং সার্ভিস সম্পর্কে বিস্তারিত বলুন")}
              className="px-2.5 py-1 rounded-lg bg-[#161C28] hover:bg-[#00F2FE]/15 border border-[#2A3447] text-gray-300 hover:text-[#00F2FE] whitespace-nowrap transition-all"
            >
              🎨 গ্রাফিক্স & ৩ডি
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage(undefined, "ভিডিও এডিটিং ও মোশন গ্রাফিক্স কীভাবে করেন এবং কী কী ভিডিও তৈরি করেন?")}
              className="px-2.5 py-1 rounded-lg bg-[#161C28] hover:bg-[#00F2FE]/15 border border-[#2A3447] text-gray-300 hover:text-[#00F2FE] whitespace-nowrap transition-all"
            >
              🎬 ভিডিও এডিটিং
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage(undefined, "ডিজিটাল মার্কেটিং ও অ্যাড ক্যাম্পেইনের বাজেট এবং পদ্ধতি কী?")}
              className="px-2.5 py-1 rounded-lg bg-[#161C28] hover:bg-[#00F2FE]/15 border border-[#2A3447] text-gray-300 hover:text-[#00F2FE] whitespace-nowrap transition-all"
            >
              📈 ডিজিটাল মার্কেটিং
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage(undefined, "UI/UX ফিগমা ওয়েব বা অ্যাপ ইন্টারফেস ডিজাইনের সময় ও রেট কত?")}
              className="px-2.5 py-1 rounded-lg bg-[#161C28] hover:bg-[#00F2FE]/15 border border-[#2A3447] text-gray-300 hover:text-[#00F2FE] whitespace-nowrap transition-all"
            >
              💻 UI/UX ডিজাইন
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#0B0F17] border-t border-[#2A3447] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="গ্রাফিক্স, ভিডিও এডিটিং, ডিজিটাল মার্কেটিং বা UI/UX নিয়ে প্রশ্ন করুন..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#161C28] border border-[#2A3447] focus:border-[#00F2FE] text-white text-xs focus:outline-none"
            />
            <button
              type="submit"
              disabled={sending || !inputText.trim()}
              className="p-2.5 rounded-xl bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-bold disabled:opacity-50 transition-all shadow-[0_0_10px_rgba(0,242,254,0.3)]"
              id="send-chat-msg-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
