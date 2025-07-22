import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Send, Volume2, X } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ally';
  text: string;
  audioUrl?: string;
  timestamp: Date;
  isPlaying?: boolean;
}

interface ConversationalAllyProps {
  onClose: () => void;
}

const ConversationalAlly = ({ onClose }: ConversationalAllyProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ally',
      text: "Namaste! I'm your Kisan Ally. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        handleVoiceMessage(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleVoiceMessage = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    // Add user message (placeholder text while processing)
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: "🎤 Voice message",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate API call for speech-to-text and response
    // In real implementation, send audioBlob to backend
    setTimeout(() => {
      const mockUserText = "What should I do about pests on my tomato plants?";
      const mockAllyResponse = "I can help you with tomato pest control! Based on common issues, I recommend checking for aphids or whiteflies. Try neem oil spray in the evening. Would you like me to show you how to prepare it?";
      
      // Update user message with transcribed text
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id 
          ? { ...msg, text: mockUserText }
          : msg
      ));

      // Add Ally response
      const allyMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ally',
        text: mockAllyResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, allyMessage]);
      
      // Simulate playing audio response
      playTextAsAudio(mockAllyResponse);
      setIsProcessing(false);
    }, 2000);
  };

  const handleTextMessage = async () => {
    if (!textInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: textInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setTextInput("");
    setIsProcessing(true);

    // Simulate API response
    setTimeout(() => {
      const allyMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ally',
        text: "That's a great question! Let me help you with that. Based on your location and current season, here's what I recommend...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, allyMessage]);
      playTextAsAudio(allyMessage.text);
      setIsProcessing(false);
    }, 1500);
  };

  const playTextAsAudio = (text: string) => {
    // Simulate text-to-speech
    // In real implementation, play audio from backend
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="h-full bg-gradient-earth flex flex-col">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-3 rounded-b-2xl shadow-soft flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Chat with Ally</h2>
            <p className="text-primary-foreground/80 text-xs">Your AI farming assistant</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <Card className={`p-2 ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground ml-2' 
                  : 'bg-card mr-2'
              }`}>
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${
                    message.type === 'user' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                  {message.type === 'ally' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 hover:bg-primary/10"
                      onClick={() => playTextAsAudio(message.text)}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <Card className="bg-card mr-2 p-2">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">Ally is thinking...</span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="flex-shrink-0 p-3 bg-card border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center space-x-2 bg-background rounded-full px-3 py-2 border border-border">
            <input
              type="text"
              placeholder="Type your message..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextMessage()}
              className="flex-1 bg-transparent border-none outline-none text-sm"
              disabled={isProcessing}
            />
            {textInput && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleTextMessage}
                disabled={isProcessing}
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="icon"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={`h-10 w-10 rounded-full ${isRecording ? 'animate-pulse' : ''}`}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        </div>
        
        {isRecording && (
          <div className="mt-2 text-center">
            <p className="text-xs text-muted-foreground animate-pulse">
              🎤 Recording... Tap to stop
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationalAlly;