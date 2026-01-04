import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

interface ChatAssistantProps {
  inline?: boolean;
  initialMessage?: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ inline = false, initialMessage }) => {
  const [isOpen, setIsOpen] = useState(inline); // Always open if inline
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: initialMessage || 'Welcome to the JRJ Design Studio. Upload a photo of your space or describe your dream bathroom to see a custom visualisation.',
      timestamp: new Date(),
    }
  ]);

  // If inline, isOpen is effectively managed by the parent or always true
  useEffect(() => {
    if (inline) setIsOpen(true);
  }, [inline]);

  // Update welcome message if initialMessage changes
  useEffect(() => {
    if (initialMessage && messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `I see you're interested in ${initialMessage.toLowerCase().includes('bathroom') ? 'bathroom renovations' : 'our services'}. ${initialMessage}`,
        timestamp: new Date(),
      }])
    }
  }, [initialMessage]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (text: string, imageBase64?: string, mimeType?: string) => {
    if (!text && !imageBase64) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      imageUrl: imageBase64 ? `data:${mimeType};base64,${imageBase64}` : undefined,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const result = await getGeminiResponse(
        text || "Please analyse this image or generate a design vision.",
        imageBase64,
        mimeType
      );

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.text,
        imageUrl: result.generatedImageUrl, // This is the AI-generated result image
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error getting response:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologise, but I'm having trouble connecting to the design server right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        handleSendMessage('', base64String, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const chatWindowClasses = inline
    ? "w-full h-full bg-white flex flex-col font-sans" // Inline styles: fills parent
    : "mb-6 w-[90vw] sm:w-[420px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-10 duration-500"; // Fixed styles

  const renderChatContent = () => (
    <>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[88%] rounded-3xl p-5 ${msg.role === 'user'
              ? 'bg-jrj-teal text-white shadow-xl shadow-jrj-teal/10 rounded-br-none'
              : 'bg-white text-slate-800 border border-slate-100 shadow-sm rounded-bl-none'
              }`}>
              {msg.imageUrl && (
                <div className="mb-3 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                  <img
                    src={msg.imageUrl}
                    alt="Design Reference"
                    className="w-full h-auto object-cover max-h-64 cursor-zoom-in"
                    onClick={() => window.open(msg.imageUrl, '_blank')}
                  />
                </div>
              )}
              <p className="text-[14px] leading-[1.6] font-medium">{msg.content}</p>
              <p className={`text-[9px] mt-2 opacity-40 uppercase tracking-tighter ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-1.5 h-1.5 bg-jrj-teal rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-jrj-teal rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-jrj-teal rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-5 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-3 bg-slate-50 rounded-full px-5 py-2 group focus-within:ring-2 focus-within:ring-jrj-teal/20 focus-within:bg-white transition-all">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={onFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-slate-400 hover:text-jrj-teal transition-colors"
            title="Visual Input"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder="Describe your vision..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={(!inputText && !isTyping)}
            className={`w-10 h-10 bg-jrj-teal text-white rounded-full flex items-center justify-center transition-all ${!inputText ? 'opacity-30 scale-90' : 'hover:scale-105 shadow-lg'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );

  if (inline) {
    return (
      <div className={chatWindowClasses}>
        {renderChatContent()}
      </div>
    )
  }

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className={chatWindowClasses}>
          {/* Luxury Header */}
          <div className="bg-white border-b border-slate-100 p-7 text-slate-900 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-jrj-teal/10 rounded-2xl flex items-center justify-center text-jrj-teal">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-lg leading-tight">Design Studio</h3>
                <p className="text-[10px] uppercase tracking-widest text-jrj-teal font-bold">AI Concierge</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {renderChatContent()}
        </div>
      )}

      {/* Unique Design Studio Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-20 h-20 bg-white text-jrj-teal rounded-[2rem] shadow-2xl flex items-center justify-center transition-all duration-500 hover:rounded-[1.5rem] active:scale-90 border border-slate-100 ${isOpen ? 'rotate-[360deg] scale-90' : 'hover:-translate-y-2'}`}
      >
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-jrj-teal rounded-full border-4 border-[#FCFCFC] animate-pulse"></div>
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-9 h-9 text-jrj-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="text-[8px] font-bold tracking-tighter uppercase mt-1 text-slate-400">Studio</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatAssistant;
