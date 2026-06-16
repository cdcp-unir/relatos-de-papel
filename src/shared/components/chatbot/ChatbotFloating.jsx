import { useEffect, useMemo, useRef, useState } from "react";
import { useChatSocket } from "../../hooks/useChatSocket";
import { useLoginState } from "../../../state/loginState";

function formatHour(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function BotIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3h6M12 3v3m-7 5a4 4 0 014-4h6a4 4 0 014 4v5a4 4 0 01-4 4h-1l-3 2-3-2H9a4 4 0 01-4-4v-5z"
        />
      </svg>
    </div>
  );
}

function ChatLauncher({ open, onClick, connected }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Cerrar chat" : "Abrir chat"}
      className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-content shadow-2xl transition hover:scale-105 hover:shadow-primary/30"
    >
      {!connected && (
        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-base-100 bg-warning" />
      )}

      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h8M8 14h5m-8 6l2.8-2H18a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9a2 2 0 002 2h.2L8 20z"
          />
        </svg>
      )}
    </button>
  );
}

export default function ChatbotFloating() {
  const { isAuthenticated, userId, email } = useLoginState();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [isWaitingBot, setIsWaitingBot] = useState(false);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const chatUserId = useMemo(() => userId || email || "guest", [userId, email]);

  const { messages, connected, connecting, sendMessage, clearMessages } =
    useChatSocket(isAuthenticated ? chatUserId : null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, isWaitingBot]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "40px";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
  }, [text]);

  useEffect(() => {
    if (!messages.length) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.sender !== "USER") {
      setIsWaitingBot(false);
    }
  }, [messages]);

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = text.trim();
    if (!value || !connected) return;

    const sent = sendMessage(value);
    if (sent) {
      setText("");
      setIsWaitingBot(true);
    }
  };

  const connectionLabel = connecting
    ? "Conectando..."
    : connected
      ? "Asistente conectado"
      : "Asistente desconectado";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-4 flex h-[min(72vh,560px)] w-[calc(100vw-24px)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-base-300/70 bg-base-100 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-base-300/60 bg-gradient-to-r from-primary to-secondary px-4 py-4 text-primary-content">
            <div className="flex items-center gap-3">
              <BotIcon />

              <div>
                <h3 className="text-sm font-bold leading-tight">Relatos Bot</h3>
                <div className="mt-1 flex items-center gap-2 text-xs opacity-95">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      connected ? "bg-success" : connecting ? "bg-warning" : "bg-error"
                    }`}
                  />
                  <span>{connectionLabel}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="btn btn-ghost btn-xs text-primary-content hover:bg-white/10"
                onClick={clearMessages}
              >
                Limpiar
              </button>

              <button
                type="button"
                className="btn btn-ghost btn-sm btn-circle text-primary-content hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden bg-base-200/60 px-4 py-4"
          >
            {messages.length === 0 && !isWaitingBot && (
              <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                <p className="text-sm font-semibold text-base-content">
                  ¡Hola! Soy Relatos Bot 👋
                </p>
                <p className="mt-2 text-sm text-base-content/70">
                  Puedo ayudarte con recomendaciones de libros, autores, categorías
                  o dudas generales sobre la tienda.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={() => setText("Recomiéndame un libro de fantasía")}
                  >
                    Fantasía
                  </button>
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={() => setText("¿Qué libros de tecnología tienes?")}
                  >
                    Tecnología
                  </button>
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={() => setText("Busco libros de misterio")}
                  >
                    Misterio
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {messages.map((msg, index) => {
                const isUser = msg.sender === "USER";

                return (
                  <div
                    key={`${msg.timestamp || index}-${index}`}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
                      <span className="mb-1 px-1 text-[11px] text-base-content/50">
                        {isUser ? "Tú" : "Relatos Bot"}
                        {msg.timestamp ? ` • ${formatHour(msg.timestamp)}` : ""}
                      </span>

                      <div
                        className={[
                          "rounded-2xl px-4 py-3 text-sm shadow-sm",
                          "whitespace-pre-wrap break-words overflow-hidden",
                          isUser
                            ? "rounded-br-md bg-primary text-primary-content"
                            : "rounded-bl-md border border-base-300 bg-base-100 text-base-content",
                        ].join(" ")}
                      >
                        {msg.message}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isWaitingBot && (
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <span className="mb-1 block px-1 text-[11px] text-base-content/50">
                      Relatos Bot
                    </span>
                    <div className="rounded-2xl rounded-bl-md border border-base-300 bg-base-100 px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-base-300/70 bg-base-100 p-3">
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                rows={1}
                className="textarea textarea-bordered min-h-[40px] flex-1 resize-none rounded-2xl text-sm leading-5"
                placeholder={
                  connected ? "Escribe tu mensaje..." : "Esperando conexión..."
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={!connected}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />

              <button
                type="submit"
                className="btn btn-primary btn-circle shrink-0"
                disabled={!connected || !text.trim()}
                aria-label="Enviar mensaje"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 20l18-8L3 4v6l10 2-10 2v6z"
                  />
                </svg>
              </button>
            </form>

            <p className="mt-2 px-1 text-[11px] text-base-content/45">
              Enter para enviar · Shift + Enter para nueva línea
            </p>
          </div>
        </div>
      )}

      <ChatLauncher
        open={open}
        onClick={() => setOpen((prev) => !prev)}
        connected={connected}
      />
    </div>
  );
}