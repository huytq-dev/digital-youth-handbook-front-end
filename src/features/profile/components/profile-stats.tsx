import * as React from "react";
import { Rss, Facebook, Instagram, Youtube, Music2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AnimatedText } from "@/components/animated-text";
import type { SocialMediaLink } from "@/features/profile/profile.type";

interface SocialPlatformStats {
  platform: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  followers: number;
}

const PLATFORM_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  youtube: Youtube,
  instagram: Instagram,
  tiktok: Music2,
};

interface ProfileStatsProps {
  socialMedias: SocialMediaLink[];
}

export function ProfileStats({ socialMedias }: ProfileStatsProps) {
  const socialMediaPlatforms: SocialPlatformStats[] = socialMedias.map((item) => {
    const key = item.platform.toLowerCase();
    let color = "";

    switch (key) {
      case "facebook":
        color = "text-blue-500";
        break;
      case "youtube":
        color = "text-red-500";
        break;
      case "instagram":
        color = "text-pink-500";
        break;
      case "tiktok":
        color = "text-gray-500";
        break;
      default:
        color = "text-[hsl(var(--muted-foreground))]";
        break;
    }

    return {
      platform: item.platform,
      color,
      icon: PLATFORM_ICON_MAP[key] ?? Rss,
      followers: item.followers ?? 0,
    };
  });

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("vi-VN", { notation: "compact", maximumFractionDigits: 1 }).format(
      value,
    );

  return (
    <Card className="border-[hsl(var(--primary))]/20 bg-[hsl(var(--card))] shadow-sm">
      <CardHeader>
        <h2 className="text-base font-bold text-[hsl(var(--foreground))]">
          <AnimatedText>Thống kê tổng quan</AnimatedText>
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {socialMediaPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.platform}
                className="flex items-center justify-between text-sm font-medium"
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${platform.color}`} />
                  <span>
                    <AnimatedText>{platform.platform}</AnimatedText>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[hsl(var(--muted-foreground))]">
                  <span>{formatNumber(platform.followers)}</span>
                  <Rss className="h-4 w-4 -scale-x-90" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}


