"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  ArrowLeft,
  ArrowUp,
  BarChart3,
  Database,
  Loader2,
  LogOut,
  MessageSquare,
  Sparkles,
  Square,
  User,
  AlertCircle,
} from "lucide-react";
import { SqlBlock } from "./SqlBlock";
import { ChatChart, type ChartSpec } from "./ChatChart";

const SUGGESTED_PROMPTS = [
  "Top 5 products by revenue overall",
  "How does each channel compare? (online vs in-store)",
  "Show monthly revenue trend by year",
  "Which regions have the highest return rates?",
  "Top 10 customers by lifetime spend",
] as const;

export default function ChatClient({
  username,
  signOutAction,
}: {
  username: string;
  signOutAction: () => Promise<void>;
}) {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/retail/chat" }),
    []
  );
  const { messages, sendMessage, status, stop, error } = useChat({ transport });

  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || status === "streaming" || status === "submitted") return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  const isStreaming = status === "streaming" || status === "submitted";
  const isEmpty = messages.length === 0;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* ── Sticky header bar ──────────────────────────────── */}
      <div className="sticky top-[68px] sm:top-[72px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/analytics/retail"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Retail
              </Link>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    Crest Retail AI
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Claude · Tool Use · BigQuery
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Signed-in badge */}
              <div className="hidden sm:inline-flex h-8 items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                <User className="h-3 w-3" />
                {username}
              </div>

              {/* Sign out (server action) */}
              <form action={signOutAction}>
                <button
                  type="submit"
                  title="Sign out"
                  className="inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden lg:inline">Sign out</span>
                </button>
              </form>

              <Link
                href="/analytics/retail/dashboard"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Message thread ─────────────────────────────────── */}
      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6">
          {isEmpty ? (
            <EmptyState onPick={handleSend} disabled={isStreaming} />
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  role={message.role}
                  parts={message.parts}
                />
              ))}
              {isStreaming && (
                <div className="flex items-center gap-2 pl-11 text-xs text-slate-500">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Thinking…
                </div>
              )}
              {error && (
                <div className="ml-11 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <div className="font-semibold">Something went wrong.</div>
                    <div className="mt-0.5">{error.message}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Composer ───────────────────────────────────────── */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1 rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 dark:border-slate-800 dark:bg-slate-900 dark:focus-within:border-emerald-600 dark:focus-within:ring-emerald-900/40">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Ask about Crest's retail data…"
                rows={1}
                disabled={isStreaming}
                className="w-full resize-none rounded-2xl bg-transparent px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none disabled:opacity-50 dark:placeholder:text-slate-500"
                style={{ minHeight: 48, maxHeight: 200 }}
              />
            </div>
            {isStreaming ? (
              <button
                type="button"
                onClick={() => stop()}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
                aria-label="Stop"
              >
                <Square className="h-4 w-4 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
                aria-label="Send"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </form>
          <p className="mt-2 text-center text-[10px] text-slate-400 dark:text-slate-500">
            AI can make mistakes · Synthetic data only · Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Message bubble ─────────────────────────────────────────

type UIMessagePart = {
  type: string;
  text?: string;
  input?: unknown;
  output?: unknown;
  state?: string;
  errorText?: string;
};

function MessageBubble({
  role,
  parts,
}: {
  role: "system" | "user" | "assistant";
  parts: UIMessagePart[];
}) {
  if (role === "user") {
    const text = parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("\n");
    return (
      <div className="flex justify-end gap-3">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-slate-900 px-4 py-2.5 text-sm text-white dark:bg-white dark:text-slate-900">
          {text}
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  // Assistant
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        {parts.map((part, i) => {
          if (part.type === "text") {
            return (
              <div
                key={i}
                className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap"
              >
                {part.text}
              </div>
            );
          }

          if (part.type === "tool-run_sql") {
            const input = part.input as { query?: string } | undefined;
            const output = part.output as
              | { row_count?: number; truncated?: boolean; error?: string }
              | undefined;
            const errText =
              part.errorText ??
              (output && "error" in output ? output.error : undefined);
            return (
              <SqlBlock
                key={i}
                query={input?.query}
                state={part.state as Parameters<typeof SqlBlock>[0]["state"]}
                rowCount={output?.row_count}
                truncated={output?.truncated}
                error={errText}
              />
            );
          }

          if (part.type === "tool-render_chart") {
            const spec = part.input as ChartSpec | undefined;
            if (!spec || !spec.data) {
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500 dark:border-slate-700"
                >
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Preparing chart…
                </div>
              );
            }
            return <ChatChart key={i} spec={spec} />;
          }

          // Fallback for other dynamic-tool / unknown part types
          return null;
        })}
      </div>
    </div>
  );
}

// ── Empty state with suggested prompts ─────────────────────

function EmptyState({
  onPick,
  disabled,
}: {
  onPick: (text: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="py-12 sm:py-20">
      <div className="text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
          <MessageSquare className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Ask about Crest retail data
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Claude reads the schema, writes the SQL, runs it on BigQuery, and explains the answer — often with a chart.
        </p>
      </div>

      <div className="mt-10 grid gap-2 sm:grid-cols-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onPick(prompt)}
            className="group rounded-xl border border-slate-200 bg-white p-4 text-left text-sm text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50/30 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20"
          >
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>{prompt}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-400 dark:text-slate-500">
        <span className="inline-flex items-center gap-1">
          <Database className="h-3 w-3" />
          BigQuery
        </span>
        <span>·</span>
        <span>Claude tool use</span>
        <span>·</span>
        <span>Read-only SQL with 5k row limit</span>
      </div>
    </div>
  );
}
