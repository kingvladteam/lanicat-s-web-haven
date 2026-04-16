import { ExternalLink } from "lucide-react";
import DiscordMarkdown from "./DiscordMarkdown";

export interface EmbedData {
  authorName: string;
  authorIconUrl: string;
  authorUrl: string;
  title: string;
  titleUrl: string;
  description: string;
  color: string;
  thumbnailUrl: string;
  imageUrl: string;
  footerText: string;
  footerIconUrl: string;
  timestamp: boolean;
  fields: { name: string; value: string; inline: boolean }[];
  botName: string;
  botAvatarUrl: string;
  content: string;
  extraImageUrls?: string[];
}

interface DiscordPreviewProps {
  embed: EmbedData;
}

const DiscordPreview = ({ embed }: DiscordPreviewProps) => {
  const now = new Date();
  const timeStr = `Today at ${now.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}`;

  const hasEmbed =
    embed.title || embed.description || embed.authorName || embed.footerText || embed.fields.length > 0 || embed.imageUrl || embed.thumbnailUrl || (embed.extraImageUrls && embed.extraImageUrls.some(Boolean));

  return (
    <div className="min-h-[200px] rounded-lg p-4" style={{ backgroundColor: "#313338" }}>
      {/* Bot header */}
      <div className="flex items-start gap-4">
        <img
          src={embed.botAvatarUrl || "https://cdn.discordapp.com/embed/avatars/0.png"}
          alt="Bot"
          className="w-10 h-10 rounded-full mt-0.5 shrink-0"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn.discordapp.com/embed/avatars/0.png"; }}
        />
        <div className="flex-1 min-w-0">
          {/* Username + badge + time */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-medium text-sm" style={{ color: "#f2f3f5" }}>
              {embed.botName || "Bot"}
            </span>
            <span
              className="text-[10px] font-medium px-1 py-px rounded"
              style={{ backgroundColor: "#5865f2", color: "#fff" }}
            >
              BOT
            </span>
            <span className="text-xs ml-1" style={{ color: "#949ba4" }}>
              {timeStr}
            </span>
          </div>

          {/* Content text above embed */}
          {embed.content && (
            <p className="text-sm mb-1 whitespace-pre-wrap">
              <DiscordMarkdown text={embed.content} />
            </p>
          )}

          {/* Embed card */}
          {hasEmbed && (
            <div
              className="rounded overflow-hidden max-w-[520px] mt-1"
              style={{ backgroundColor: "#2b2d31" }}
            >
              <div className="flex">
                {/* Left color bar */}
                <div className="w-1 shrink-0 rounded-l" style={{ backgroundColor: embed.color || "#1e1f22" }} />

                <div className="p-3 flex-1 min-w-0">
                  <div className="flex gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Author */}
                      {embed.authorName && (
                        <div className="flex items-center gap-2 mb-1">
                          {embed.authorIconUrl && (
                            <img
                              src={embed.authorIconUrl}
                              alt=""
                              className="w-6 h-6 rounded-full"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                          )}
                          {embed.authorUrl ? (
                            <a
                              href={embed.authorUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-semibold hover:underline"
                              style={{ color: "#f2f3f5" }}
                            >
                              {embed.authorName}
                            </a>
                          ) : (
                            <span className="text-sm font-semibold" style={{ color: "#f2f3f5" }}>
                              {embed.authorName}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Title */}
                      {embed.title && (
                        <div className="mb-1">
                          {embed.titleUrl ? (
                            <a
                              href={embed.titleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-sm hover:underline"
                              style={{ color: "#00aff4" }}
                            >
                              {embed.title}
                            </a>
                          ) : (
                            <span className="font-semibold text-sm" style={{ color: "#f2f3f5" }}>
                              {embed.title}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Description */}
                      {embed.description && (
                        <p className="text-sm whitespace-pre-wrap mb-2">
                          <DiscordMarkdown text={embed.description} />
                        </p>
                      )}

                      {/* Fields */}
                      {embed.fields.length > 0 && (
                        <div className="grid gap-2 mb-2" style={{
                          gridTemplateColumns: embed.fields.some(f => f.inline)
                            ? "repeat(3, 1fr)"
                            : "1fr"
                        }}>
                          {embed.fields.map((field, i) => (
                            <div
                              key={i}
                              className={field.inline ? "" : "col-span-full"}
                            >
                              <div className="text-xs font-semibold mb-0.5" style={{ color: "#f2f3f5" }}>
                                {field.name}
                              </div>
                              <div className="text-sm">
                                <DiscordMarkdown text={field.value} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Thumbnail */}
                    {embed.thumbnailUrl && (
                      <img
                        src={embed.thumbnailUrl}
                        alt=""
                        className="w-20 h-20 rounded object-cover shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    )}
                  </div>

                  {/* Images (gallery) */}
                  {(() => {
                    const allImages = [embed.imageUrl, ...(embed.extraImageUrls || [])].filter(Boolean) as string[];
                    if (allImages.length === 0) return null;
                    if (allImages.length === 1) {
                      return (
                        <img
                          src={allImages[0]}
                          alt=""
                          className="max-w-full rounded mt-2 max-h-[300px] object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      );
                    }
                    const cols = allImages.length === 2 ? "grid-cols-2" : "grid-cols-2";
                    return (
                      <div className={`grid ${cols} gap-1 mt-2 rounded overflow-hidden`}>
                        {allImages.slice(0, 4).map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt=""
                            className="w-full h-32 object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        ))}
                      </div>
                    );
                  })()}

                  {/* Footer */}
                  {(embed.footerText || embed.timestamp) && (
                    <div className="flex items-center gap-2 mt-2">
                      {embed.footerIconUrl && (
                        <img
                          src={embed.footerIconUrl}
                          alt=""
                          className="w-5 h-5 rounded-full"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      )}
                      <span className="text-xs" style={{ color: "#949ba4" }}>
                        {embed.footerText}
                        {embed.footerText && embed.timestamp && " • "}
                        {embed.timestamp && now.toLocaleDateString("uk-UA")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscordPreview;
