import { Globe2, Facebook, Instagram, Youtube, Music2, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animated-text";
import type { SocialMediaLink } from "@/features/profile/profile.type";

interface ProfileSocialLinksProps {
  socialMediaLinks: SocialMediaLink[];
}

const PLATFORM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  youtube: Youtube,
  instagram: Instagram,
  tiktok: Music2,
};

export function ProfileSocialLinks({ socialMediaLinks }: ProfileSocialLinksProps) {
  const platforms = ["facebook", "youtube", "instagram", "tiktok"];

  return (
    <Card className="border-[hsl(var(--primary))]/20 bg-[hsl(var(--card))] shadow-sm">
      <CardHeader>
        <h2 className="text-base font-bold text-[hsl(var(--foreground))]">
          <AnimatedText>Liên kết mạng xã hội</AnimatedText>
        </h2>
      </CardHeader>
      <CardContent className="space-y-3">
        {platforms.map((platform) => {
          const Icon = PLATFORM_ICONS[platform] ?? Globe2;
          const linkObj = socialMediaLinks.find(
            (sm) => sm.platform.toLowerCase() === platform,
          );
          const link = linkObj?.url;

          return (
            <div
              key={platform}
              className="flex items-center justify-between rounded-lg border border-[hsl(var(--primary))]/10 bg-[hsl(var(--card))] p-3 transition-colors hover:bg-[hsl(var(--secondary))]/40"
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <div className="text-sm font-medium capitalize">
                  <AnimatedText>{platform}</AnimatedText>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {link ? (
                  <>
                    <span className="w-40 truncate text-sm text-[hsl(var(--muted-foreground))]">
                      <AnimatedText>{link}</AnimatedText>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => window.open(link, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <span className="text-sm italic text-[hsl(var(--muted-foreground))]">
                    <AnimatedText>Chưa có</AnimatedText>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}


