import { useState } from "react";
import { User, History, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/primitives";
import { AnimatedText } from "@/components/animated-text";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { PersonalInfo } from "@/features/profile/components/personal-info";
import { QuizHistory } from "@/features/profile/components/quiz-history";
import { DangerZone } from "@/features/profile/components/danger-zone";
import type { GenderType, UserProfile } from "@/features/profile/profile.type";

const MOCK_USER: UserProfile = {
  id: "1",
  name: "Thanh niên Việt Nam",
  email: "digital.youth@example.com",
  picture: "https://i.pravatar.cc/200?img=32",
  gender: 0 as GenderType,
  dob: "2001-01-01T00:00:00",
  address: "Quận 1, TP. Hồ Chí Minh",
  isVerified: true,
  roles: [
    { id: "1", roleName: "Student" },
    { id: "2", roleName: "Member" },
  ],
  quizAttempts: [
    {
      id: "101",
      quizTitle: "Kiến thức Đoàn - Hội cơ bản",
      score: 9.0,
      completedAt: "2025-11-20T00:00:00",
      isPassed: true,
    },
    {
      id: "102",
      quizTitle: "Kỹ năng số an toàn",
      score: 7.5,
      completedAt: "2025-11-10T00:00:00",
      isPassed: true,
    },
    {
      id: "103",
      quizTitle: "Lịch sử phong trào thanh niên",
      score: 6.0,
      completedAt: "2025-10-28T00:00:00",
      isPassed: false,
    },
  ],
};

type TabKey = "info" | "history" | "security";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("info");

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<any> }[] = [
    { key: "info", label: "Thông tin", icon: User },
    { key: "history", label: "Lịch sử thi", icon: History },
    { key: "security", label: "Bảo mật", icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] pb-20 pt-20 font-sans text-[hsl(var(--foreground))]">
      <ProfileHeader />
      <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Left column: tabs */}
          <div className="space-y-6">
            <nav className="flex flex-col space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ease-out ${
                      isActive
                        ? "border border-[hsl(var(--primary))]/60 bg-[hsl(var(--card))] text-[hsl(var(--primary))] shadow-sm shadow-[hsl(var(--primary))/0.15] translate-x-0"
                        : "border border-transparent bg-transparent text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))]/60 hover:text-[hsl(var(--foreground))] hover:translate-x-0.5"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-colors duration-300 ${
                        isActive
                          ? "text-[hsl(var(--primary))]"
                          : "text-[hsl(var(--muted-foreground))]"
                      }`}
                    />
                    <AnimatedText>{tab.label}</AnimatedText>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right column: main content */}
          <div className="space-y-6">
            {activeTab === "info" && <PersonalInfo user={MOCK_USER} />}

            {activeTab === "history" && (
              <QuizHistory attempts={MOCK_USER.quizAttempts} />
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="mb-1 text-lg font-bold text-[hsl(var(--foreground))]">
                      <AnimatedText>Cài đặt bảo mật</AnimatedText>
                    </h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      <AnimatedText>
                        Quản lý mật khẩu và các phương thức đăng nhập. Tính năng
                        đổi mật khẩu chi tiết đang được phát triển.
                      </AnimatedText>
                    </p>
                    <div className="mt-6 rounded-lg border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--secondary))]/40 p-4 text-center text-sm text-[hsl(var(--muted-foreground))]">
                      <AnimatedText>
                        Khu vực này sẽ cho phép bạn cấu hình xác thực 2 bước và
                        xem lịch sử đăng nhập trong tương lai.
                      </AnimatedText>
                    </div>
                  </CardContent>
                </Card>
                <DangerZone />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
