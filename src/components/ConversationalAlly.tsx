import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Send, Volume2, X, Phone, PhoneOff, User, Settings } from "lucide-react";

// Change this if your backend is not on localhost
const WS_URL = "ws://localhost:8000/ws";

interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
}

interface ConversationalAllyProps {
  onClose: () => void;
}

const ConversationalAlly = ({ onClose }: ConversationalAllyProps) => {
  // WebSocket states
  const [connected, setConnected] = useState(false);
  const [recording, setRecording] = useState(false);
  const [responding, setResponding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('kisanally_user_id') || '';
  });
  const [userStatus, setUserStatus] = useState<string | null>(null);
  
  // Refs for WebSocket and audio
  const wsRef = useRef<WebSocket | null>(null);
  const recordingTimerRef = useRef<number | null>(null);
  const recordingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Audio refs
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  
  // For Gemini playback
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const playbackRunningRef = useRef(false);
  const playbackQueueRef = useRef<ArrayBuffer[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      console.log("🧹 Cleaning up ConversationalAlly component...");
      closeAll();
    };
  }, []);

  // Separate function to connect WebSocket
  async function connectWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      wsRef.current = new WebSocket(WS_URL);
      wsRef.current.binaryType = "arraybuffer";

      wsRef.current.onopen = () => {
        console.log("🔗 WebSocket connected successfully");
        
        // Send user identification message (even if userId is empty)
        const userHello = {
          type: "hello",
          user_id: userId.trim()
        };
        wsRef.current?.send(JSON.stringify(userHello));
        console.log("📤 Sent user identification:", userHello);
        
        setConnected(true);
        resolve();
      };

      wsRef.current.onclose = () => {
        console.log("🔌 WebSocket closed");
        setConnected(false);
        setRecording(false);
        setResponding(false);
      };

      wsRef.current.onerror = (e) => {
        console.error("❌ WebSocket error:", e);
        setError("WebSocket error: " + (e as any).message);
        setConnected(false);
        setRecording(false);
        setResponding(false);
        reject(e);
      };

      wsRef.current.onmessage = (event) => {
        if (typeof event.data === "string") {
          try {
            const msg = JSON.parse(event.data);
            console.log("📨 Received message:", msg);
            
            if (msg.type === "assign_user_id") {
              setUserId(msg.user_id);
              localStorage.setItem('kisanally_user_id', msg.user_id);
              console.log("🆔 Assigned new user ID:", msg.user_id);
              addSystemMessage(`🆔 Generated your User ID: ${msg.user_id}`);
            } else if (msg.type === "user_status") {
              setUserStatus(msg.status);
              if (msg.status === "existing_user") {
                addSystemMessage(`👋 Welcome back, ${msg.user_data.name} from ${msg.user_data.village}! I remember you grow ${msg.user_data.crops}.`);
              } else if (msg.status === "new_user") {
                addSystemMessage("🆕 New user detected - starting onboarding conversation...");
              }
            } else if (msg.type === "onboarding_complete") {
              setUserStatus("existing_user");
              addSystemMessage(`✅ ${msg.message} Profile: ${msg.user_data.name} from ${msg.user_data.village}`);
            } else if (msg.type === "session_ready") {
              console.log("✅ Session ready with ID:", msg.session_id);
            } else if (msg.type === "input_transcription") {
              console.log("🎤 User said:", msg.text);
              addMessage("user", msg.text);
              setResponding(true);
            } else if (msg.type === "output_transcription") {
              console.log("🤖 Assistant said:", msg.text);
              updateOrAddAssistantMessage(msg.text);
            } else if (msg.type === "turn_complete") {
              console.log("🔄 Turn completed");
              setResponding(false);
            } else if (msg.type === "text") {
              addMessage("assistant", msg.text);
            } else if (msg.type === "error") {
              setError(msg.message);
            }
          } catch (err) {
            console.error("Error parsing JSON message:", err);
          }
        } else if (event.data instanceof ArrayBuffer) {
          // PCM 24kHz mono audio from Gemini
          playbackQueueRef.current.push(event.data);
          if (!playbackRunningRef.current) playFromQueue();
        }
      };
    });
  }

  // Helper functions for managing conversation
  const addMessage = (sender: 'user' | 'assistant' | 'system', text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, newMessage]);
  };

  const addSystemMessage = (text: string) => {
    addMessage("system", text);
  };

  const updateOrAddAssistantMessage = (text: string) => {
    setConversation(prev => {
      const newConv = [...prev];
      const lastMsg = newConv[newConv.length - 1];
      if (lastMsg && lastMsg.sender === "assistant") {
        lastMsg.text = (lastMsg.text || "") + " " + text;
      } else {
        newConv.push({
          id: Date.now().toString(),
          sender: "assistant",
          text,
          timestamp: new Date()
        });
      }
      return newConv;
    });
  };

  // ---- PUSH-TO-TALK LOGIC ----
  async function startRecording() {
    setError(null);
    if (recording || responding) return;
    
    console.log("🎬 Starting new recording session...");
    setRecording(true);
    recordingRef.current = true;
    setResponding(false);

    // Only create WebSocket if not already connected
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log("🔌 WebSocket not connected, establishing connection...");
      try {
        await connectWebSocket();
      } catch (err) {
        console.error("Failed to connect WebSocket:", err);
        setError("Failed to connect to server");
        setRecording(false);
        recordingRef.current = false;
        return;
      }
    } else {
      console.log("✅ WebSocket already connected, reusing connection");
    }
    
    // Reset recording timer
    setRecordingTime(0);
    recordingTimerRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 0.1);
    }, 100);
    
    addSystemMessage("🎤 Start speaking! (Record for at least 2-3 seconds)");
    
    // Start fresh audio capture for this session
    await startMicStreaming();
  }

  // Stop recording and signal backend (audio_end)
  function stopRecording() {
    setRecording(false);
    recordingRef.current = false;
    
    // Clear recording timer
    if (recordingTimerRef.current) {
      window.clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    // Warn if recording was too short
    if (recordingTime < 1.0) {
      setError("Recording too short! Please record for at least 2-3 seconds and speak clearly.");
      setRecordingTime(0);
      return;
    }
    
    // Stop mic + PCM
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    
    // Signal "audio_end" to Gemini, then wait for its reply
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "audio_end" }));
      setResponding(true);
      addSystemMessage(`🧑‍🌾 Recorded ${recordingTime.toFixed(1)}s - Waiting for KisanAlly's reply...`);
    }
    setRecordingTime(0);
  }

  // Close everything and end conversation
  function closeAll() {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (recordingTimerRef.current) {
      window.clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    
    // Reset states
    setConnected(false);
    setRecording(false);
    setResponding(false);
    setRecordingTime(0);
    playbackRunningRef.current = false;
    playbackQueueRef.current = [];
    
    addSystemMessage("❌ Conversation ended. Click 'Start Recording' to begin a new conversation.");
  }

  // --- AUDIO CAPTURE (PCM streaming, 16kHz) ---
  async function startMicStreaming() {
    try {
      console.log("🎤 Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, sampleRate: 16000 },
      });
      console.log("✅ Microphone access granted");
      
      micStreamRef.current = stream;
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      console.log("🔊 Audio context created, sample rate:", audioCtxRef.current.sampleRate);
      
      const src = audioCtxRef.current.createMediaStreamSource(stream);
      processorRef.current = audioCtxRef.current.createScriptProcessor(4096, 1, 1);
      console.log("🔧 Audio processor created");

      src.connect(processorRef.current);
      processorRef.current.connect(audioCtxRef.current.destination);

      let chunkCount = 0;
      processorRef.current.onaudioprocess = (e) => {
        chunkCount++;
        if (chunkCount % 10 === 0) {
          console.log(`📊 Audio chunk #${chunkCount} processed`);
          console.log(`🔍 State check - WS ready: ${wsRef.current?.readyState === WebSocket.OPEN}, recording: ${recordingRef.current}, wsRef exists: ${!!wsRef.current}`);
        }
        
        const input = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(input.length);
        for (let i = 0; i < input.length; ++i) {
          let s = Math.max(-1, Math.min(1, input[i]));
          pcm16[i] = s < 0 ? s * 32768 : s * 32767;
        }
        
        if (
          wsRef.current &&
          wsRef.current.readyState === WebSocket.OPEN &&
          recordingRef.current
        ) {
          console.log(`📤 Sending audio chunk #${chunkCount} (${pcm16.buffer.byteLength} bytes) to server`);
          wsRef.current.send(pcm16.buffer);
        } else {
          if (chunkCount % 20 === 0) {
            console.log(`⚠️ Not sending audio - WS state: ${wsRef.current?.readyState}, recording: ${recordingRef.current}`);
          }
        }
      };
      console.log("🎙️ Audio processing started successfully");
    } catch (err) {
      console.error("❌ Microphone error:", err);
      setError("Microphone error: " + (err as any).message);
      setRecording(false);
      setConnected(false);
    }
  }

  // --- PLAYBACK Gemini PCM 24kHz audio ---
  function playFromQueue() {
    playbackRunningRef.current = true;
    if (!playbackCtxRef.current) {
      playbackCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = playbackCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    if (playbackQueueRef.current.length === 0) {
      playbackRunningRef.current = false;
      console.log("🔊 Audio playback completed, ready for next interaction");
      return;
    }
    const buf = playbackQueueRef.current.shift()!;
    const pcm = new Int16Array(buf);
    const audioBuffer = ctx.createBuffer(1, pcm.length, 24000);
    const chan = audioBuffer.getChannelData(0);
    for (let i = 0; i < pcm.length; ++i) {
      chan[i] = pcm[i] / 32768.0;
    }
    const src = ctx.createBufferSource();
    src.buffer = audioBuffer;
    src.connect(ctx.destination);
    src.onended = playFromQueue;
    src.start();
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusColor = () => {
    if (recording) return "bg-red-500";
    if (responding) return "bg-blue-500";
    if (connected) return "bg-green-500";
    return "bg-gray-500";
  };

  const getStatusText = () => {
    if (recording) return `Recording (${recordingTime.toFixed(1)}s)`;
    if (responding) return "AI Responding...";
    if (connected) return "Connected";
    return "Disconnected";
  };

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-3 rounded-b-2xl shadow-lg flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-lg font-semibold">🌾 KisanAlly Voice Chat</h2>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                <p className="text-white/80 text-xs">{getStatusText()}</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* User ID Section */}
        <div className="mt-3 flex items-center space-x-2">
          <User className="h-4 w-4" />
          <Input
            type="text"
            placeholder="Enter User ID (optional)"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              if (e.target.value) {
                localStorage.setItem('kisanally_user_id', e.target.value);
              } else {
                localStorage.removeItem('kisanally_user_id');
              }
            }}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 text-sm"
          />
          {userStatus && (
            <Badge variant={userStatus === "existing_user" ? "default" : "secondary"} className="text-xs">
              {userStatus === "existing_user" ? "✅ Existing" : "🆕 New"}
            </Badge>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 m-3 rounded-lg text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {conversation.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-4xl mb-2">🌾</div>
            <p className="text-sm">Click "Start Recording" to begin your conversation with KisanAlly</p>
            <p className="text-xs mt-1">Speak in Telugu or English for best results</p>
          </div>
        )}
        
        {conversation.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <Card className={`p-3 ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white ml-2' 
                  : message.sender === 'assistant'
                  ? 'bg-white border-green-200 mr-2'
                  : 'bg-gray-100 border-gray-200 mr-2'
              }`}>
                <div className="flex items-start justify-between">
                  <p className="text-sm leading-relaxed flex-1">{message.text}</p>
                  {message.sender === 'assistant' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 ml-2 hover:bg-green-100"
                      onClick={() => {
                        if ('speechSynthesis' in window) {
                          const utterance = new SpeechSynthesisUtterance(message.text);
                          speechSynthesis.speak(utterance);
                        }
                      }}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${
                    message.sender === 'user' 
                      ? 'text-blue-100' 
                      : 'text-gray-500'
                  }`}>
                    {message.sender === 'user' ? '🧑‍🌾 You' : message.sender === 'assistant' ? '🤖 KisanAlly' : '📱 System'} • {formatTime(message.timestamp)}
                  </span>
                </div>
              </Card>
            </div>
          </div>
        ))}
        
        {responding && (
          <div className="flex justify-start">
            <Card className="bg-white border-green-200 mr-2 p-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-gray-500">KisanAlly is thinking...</span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Control Section */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
        {!recording && !responding ? (
          <div className="flex justify-center space-x-3">
            <Button
              onClick={startRecording}
              disabled={!navigator.mediaDevices}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg"
            >
              <Mic className="h-5 w-5 mr-2" />
              🎤 Start Recording
            </Button>
            {connected && (
              <Button
                onClick={closeAll}
                variant="destructive"
                className="px-4 py-3 rounded-full"
              >
                <PhoneOff className="h-5 w-5 mr-2" />
                ❌ End Conversation
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <Button
              onClick={stopRecording}
              disabled={responding}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-medium shadow-lg"
            >
              <MicOff className="h-6 w-6 mr-2" />
              🛑 Stop & Ask KisanAlly
            </Button>
            
            {recording && (
              <div className="text-center">
                <p className="text-green-600 font-medium animate-pulse">
                  🎤 Recording... Keep speaking ({recordingTime.toFixed(1)}s)
                </p>
                {recordingTime < 2.0 && (
                  <p className="text-orange-500 text-sm">
                    (Record at least 2-3 seconds)
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="mt-3 text-center text-xs text-gray-500">
          <p><strong>Instructions:</strong> Click "Start Recording" → Speak clearly → Click "Stop & Ask"</p>
          <p>💡 Use Chrome/Edge for best audio quality • Speak in Telugu or English</p>
        </div>
        
        {/* Debug Section */}
        <div className="mt-4 p-2 bg-gray-50 rounded-lg text-xs text-gray-600">
          <strong>🔍 Debug Info:</strong><br />
          <b>User ID:</b> {userId || "Not set"} | <b>Status:</b> {userStatus || "Unknown"}<br />
          <b>Connection:</b> {connected ? "✅ Connected" : "❌ Disconnected"} | <b>Recording:</b> {recording ? "🔴 Active" : "⚪ Inactive"}<br />
          <b>Conversation Turns:</b> {conversation.filter(m => m.sender === "user").length}<br />
        </div>
      </div>
    </div>
  );
};

export default ConversationalAlly;