import React, { useState, useEffect } from 'react';
import { Mail, X, CheckCircle, AlertTriangle, Send, RefreshCw, LogOut, ShieldCheck, Database, Eye, MessageSquare, Bell } from 'lucide-react';
import { 
  initGmailAuth, 
  connectGmailOAuth, 
  disconnectGmail, 
  sendGmailNotification, 
  TARGET_GMAIL 
} from '../lib/gmail';
import { User } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface GmailControlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GmailControlModal: React.FC<GmailControlModalProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testSending, setTestSending] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  // Auth listener
  useEffect(() => {
    const unsubscribe = initGmailAuth(
      (user) => {
        setCurrentUser(user);
        setIsConnected(true);
      },
      () => {
        setCurrentUser(null);
        setIsConnected(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Listen to Firestore activity logs
  useEffect(() => {
    if (!isOpen) return;

    const q = query(collection(db, 'email_notifications'), orderBy('createdAt', 'desc'), limit(15));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setLogs(docs);
    });

    return () => unsub();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setLoading(true);
    setTestSuccessMessage(null);
    try {
      const res = await connectGmailOAuth();
      if (res) {
        setCurrentUser(res.user);
        setIsConnected(true);
      }
    } catch (err: any) {
      console.info('Gmail sign in notice:', err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await disconnectGmail();
    setCurrentUser(null);
    setIsConnected(false);
    setTestSuccessMessage(null);
  };

  const handleSendTestEmail = async () => {
    setTestSending(true);
    setTestSuccessMessage(null);

    const res = await sendGmailNotification(
      'Page View',
      '🧪 Test Alert: Gmail Notification System Active for Khondoker Creation',
      `
        <div style="font-family: Arial; padding: 20px; background: #0b0f17; color: white; border-radius: 10px; border: 1px solid #00F2FE;">
          <h2 style="color: #00F2FE;">Gmail Connection Verification</h2>
          <p>This is a test notification confirming that Gmail API is successfully connected for <strong>${TARGET_GMAIL}</strong>!</p>
          <p>Any order, quote calculation, chat SMS, or website visit will trigger an immediate Gmail alert to this address.</p>
        </div>
      `,
      `Manual test email sent to ${TARGET_GMAIL}`
    );

    setTestSending(false);
    if (res.success) {
      setTestSuccessMessage(`Success! Test email sent via Gmail API to ${TARGET_GMAIL} (ID: ${res.messageId})`);
    } else {
      setTestSuccessMessage(`Saved to Firestore activity log (${res.error || res.reason}). Connect Google Sign-in to deliver via live Gmail API.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#161C28] border border-[#2A3447] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Glow Header */}
        <div className="flex items-center justify-between border-b border-[#2A3447] pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/15 border border-[#00F2FE]/40 flex items-center justify-center text-[#00F2FE]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-xl text-white">Gmail Alert Settings</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#00F2FE]/10 text-[#00F2FE] text-[10px] font-bold border border-[#00F2FE]/30">
                  Gmail API Active
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Target Email: <span className="text-white font-mono font-bold">{TARGET_GMAIL}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1">
          
          {/* Connection Status Box */}
          <div className="p-5 rounded-xl bg-[#0B0F17] border border-[#2A3447] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-5 h-5 ${isConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span className="text-xs font-bold text-white">Google OAuth Authentication Status</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                isConnected 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
                {isConnected ? 'Connected & Authorized' : 'Firestore Logging Active'}
              </span>
            </div>

            {isConnected && currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#161C28] border border-[#2A3447]">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-[#00F2FE]" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#00F2FE] text-black font-bold flex items-center justify-center text-xs">
                      {currentUser.email?.[0].toUpperCase() || 'G'}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-white">{currentUser.displayName || 'Authorized User'}</div>
                    <div className="text-[11px] text-[#94A3B8] font-mono">{currentUser.email}</div>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" /> Disconnect
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#161C28] border border-[#2A3447] space-y-3 text-center">
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Sign in with Google to enable direct live transmission of email alerts to <strong className="text-white">{TARGET_GMAIL}</strong> using Gmail REST API.
                </p>
                
                {/* Official "Sign in with Google" Button */}
                <div className="flex justify-center pt-1">
                  <button
                    onClick={handleSignIn}
                    disabled={loading}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs shadow-md border border-gray-300 transition-all hover:scale-105 disabled:opacity-50"
                    id="gsi-login-btn"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>
            )}

            {/* Test Email Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#2A3447]/60">
              <span className="text-xs text-[#94A3B8]">Send test alert to {TARGET_GMAIL}</span>
              <button
                onClick={handleSendTestEmail}
                disabled={testSending}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.3)] disabled:opacity-50"
              >
                {testSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Send Test Notification</span>
              </button>
            </div>

            {testSuccessMessage && (
              <div className="p-3 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/40 text-xs text-[#00F2FE] leading-relaxed">
                {testSuccessMessage}
              </div>
            )}
          </div>

          {/* Automated Notification Rules List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#00F2FE] uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4" /> Active Email Triggers & Automated Rules
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Client Order / Inquiry</div>
                  <div className="text-[11px] text-[#94A3B8]">Sends project brief, budget, & contact email instantly.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#00F2FE]/20 text-[#00F2FE]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Live Chat SMS</div>
                  <div className="text-[11px] text-[#94A3B8]">Triggers alert whenever a client sends a message.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Website Seen / View Alert</div>
                  <div className="text-[11px] text-[#94A3B8]">Alerts when visitors browse Khondoker Creation pages.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Firestore Dual Persistence</div>
                  <div className="text-[11px] text-[#94A3B8]">All alerts archived in Firestore database history.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#00F2FE] uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4" /> Realtime Activity & Sent Log
            </h4>

            {logs.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-500 bg-[#0B0F17] rounded-xl border border-[#2A3447]">
                No notification events recorded yet. Try clicking "Send Test Notification" above!
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {logs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-[#0B0F17] border border-[#2A3447] flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="px-1.5 py-0.5 rounded bg-[#161C28] text-[#00F2FE] text-[10px]">
                          {log.type}
                        </span>
                        <span>{log.subject}</span>
                      </div>
                      <div className="text-[11px] text-[#94A3B8] mt-0.5">{log.details}</div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono ml-2 whitespace-nowrap">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
