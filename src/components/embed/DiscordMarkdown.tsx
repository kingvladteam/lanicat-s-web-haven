import React from "react";

/**
 * Parses Discord-style markdown into React elements.
 * Supports: **bold**, *italic*, __underline__, ~~strikethrough~~,
 * `inline code`, ```code blocks```, [text](url), ||spoiler||
 */

interface DiscordMarkdownProps {
  text: string;
  color?: string;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseInline = (text: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  // Order matters: longer/more-specific patterns first
  const patterns: {
    regex: RegExp;
    render: (match: RegExpMatchArray, key: number) => React.ReactNode;
  }[] = [
    // code block (``` ```)
    {
      regex: /```(?:\w*\n)?([\s\S]*?)```/,
      render: (m, k) => (
        <pre
          key={k}
          className="rounded px-2 py-1 text-sm my-1 whitespace-pre-wrap"
          style={{ backgroundColor: "#1e1f22", color: "#dbdee1" }}
        >
          <code>{m[1]}</code>
        </pre>
      ),
    },
    // inline code
    {
      regex: /`([^`]+)`/,
      render: (m, k) => (
        <code
          key={k}
          className="rounded px-1 py-0.5 text-sm"
          style={{ backgroundColor: "#1e1f22", color: "#dbdee1" }}
        >
          {m[1]}
        </code>
      ),
    },
    // spoiler
    {
      regex: /\|\|(.+?)\|\|/,
      render: (m, k) => (
        <span
          key={k}
          className="rounded px-1 cursor-pointer"
          style={{ backgroundColor: "#383a40", color: "#383a40" }}
          onClick={(e) => {
            const el = e.currentTarget;
            el.style.color = "#dbdee1";
          }}
        >
          {m[1]}
        </span>
      ),
    },
    // bold italic ***text***
    {
      regex: /\*\*\*(.+?)\*\*\*/,
      render: (m, k) => (
        <strong key={k} style={{ fontStyle: "italic" }}>
          {parseInline(m[1])}
        </strong>
      ),
    },
    // bold
    {
      regex: /\*\*(.+?)\*\*/,
      render: (m, k) => <strong key={k}>{parseInline(m[1])}</strong>,
    },
    // underline
    {
      regex: /__(.+?)__/,
      render: (m, k) => (
        <span key={k} style={{ textDecoration: "underline" }}>
          {parseInline(m[1])}
        </span>
      ),
    },
    // italic
    {
      regex: /\*(.+?)\*/,
      render: (m, k) => <em key={k}>{parseInline(m[1])}</em>,
    },
    // italic with _
    {
      regex: /_(.+?)_/,
      render: (m, k) => <em key={k}>{parseInline(m[1])}</em>,
    },
    // strikethrough
    {
      regex: /~~(.+?)~~/,
      render: (m, k) => (
        <span key={k} style={{ textDecoration: "line-through" }}>
          {parseInline(m[1])}
        </span>
      ),
    },
    // link
    {
      regex: /\[([^\]]+)\]\(([^)]+)\)/,
      render: (m, k) => (
        <a
          key={k}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "#00aff4" }}
        >
          {m[1]}
        </a>
      ),
    },
  ];

  let remaining = text;
  let keyCounter = 0;

  while (remaining.length > 0) {
    let earliestMatch: RegExpMatchArray | null = null;
    let earliestIndex = Infinity;
    let matchedPattern: (typeof patterns)[0] | null = null;

    for (const p of patterns) {
      const match = remaining.match(p.regex);
      if (match && match.index !== undefined && match.index < earliestIndex) {
        earliestMatch = match;
        earliestIndex = match.index;
        matchedPattern = p;
      }
    }

    if (earliestMatch && matchedPattern && earliestIndex !== Infinity) {
      // text before match
      if (earliestIndex > 0) {
        nodes.push(remaining.slice(0, earliestIndex));
      }
      nodes.push(matchedPattern.render(earliestMatch, keyCounter++));
      remaining = remaining.slice(earliestIndex + earliestMatch[0].length);
    } else {
      nodes.push(remaining);
      break;
    }
  }

  return nodes;
};

const DiscordMarkdown: React.FC<DiscordMarkdownProps> = ({ text, color }) => {
  return (
    <span style={{ color: color || "#dbdee1" }}>
      {parseInline(text)}
    </span>
  );
};

export default DiscordMarkdown;
