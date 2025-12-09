import { useState, useMemo } from "react";
import { User, History, ShieldAlert, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/primitives";
import { AnimatedText } from "@/components/animated-text";
import { UnifiedHeader } from "@/components/layout/unified-header";
import { PersonalInfo } from "@/features/profile/components/personal-info";
import { QuizHistory } from "@/features/profile/components/quiz-history";
import { DangerZone } from "@/features/profile/components/danger-zone";
import type { UserProfile } from "@/features/profile/profile.type";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/auth.slice";
import { cn } from "@/lib/utils";

type TabKey = "info" | "history" | "security";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("info");
  const user = useSelector(selectCurrentUser);

  // Map UserDomainModel từ Redux sang UserProfile
  const userProfile: UserProfile | null = useMemo(() => {
    if (!user) return null;
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture ?? undefined,
      gender: user.gender ?? undefined,
      dob: user.dob ?? undefined,
      address: user.address ?? undefined,
      isVerified: user.isVerified,
      roles: [
        { id: user.id, roleName: user.roleName } // Map roleName thành roles array
      ],
      quizAttempts: [], // Quiz attempts sẽ được fetch riêng sau
    };
  }, [user]);

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<any> }[] = [
    { key: "info", label: "Thông tin cá nhân", icon: User },
    { key: "history", label: "Lịch sử thi", icon: History },
    { key: "security", label: "Bảo mật tài khoản", icon: ShieldAlert },
  ];

  // Nếu chưa có user, hiển thị loading hoặc redirect
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-[#fff9f0] pb-20 pt-20 font-sans text-slate-900">
        <UnifiedHeader />
        <div className="mx-auto mt-8 sm:mt-10 lg:mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-lg font-bold text-slate-600">Đang tải thông tin...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9f0] pb-20 pt-20 font-sans text-slate-900">
      <UnifiedHeader />
      
      <div className="mx-auto mt-8 sm:mt-10 lg:mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">
                Hồ sơ của tôi
            </h1>
            <p className="text-sm font-bold text-slate-500 mt-1">
                Quản lý thông tin cá nhân và lịch sử hoạt động
            </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Left column: Sidebar Tabs (Neo-brutalism Style) */}
          <div className="space-y-6">
            <nav className="flex flex-col space-y-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                        "group flex items-center justify-between rounded-xl border-2 border-black px-4 py-3.5 text-sm font-bold transition-all duration-200",
                        isActive
                          ? "bg-yellow-300 shadow-[4px_4px_0px_black] -translate-y-1 -translate-x-1"
                          : "bg-white hover:bg-blue-50 hover:shadow-[2px_2px_0px_black] hover:-translate-y-0.5 hover:-translate-x-0.5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                              "h-5 w-5",
                              isActive ? "text-black" : "text-slate-500 group-hover:text-blue-600"
                          )}
                        />
                        <span className={cn(isActive ? "text-black" : "text-slate-600 group-hover:text-slate-900")}>
                            {tab.label}
                        </span>
                    </div>
                    {isActive && <ChevronRight size={16} strokeWidth={3} />}
                  </button>
                );
              })}
            </nav>
            
            {/* Decor Box bên dưới menu */}
            <div className="hidden lg:block rounded-xl border-2 border-dashed border-black bg-blue-100 p-4 text-xs font-bold text-blue-900 leading-relaxed">
                💡 Mẹo: Cập nhật thông tin thường xuyên giúp bạn nhận được các gợi ý khóa học phù hợp hơn!
            </div>
          </div>

          {/* Right column: Main Content */}
          <div className="space-y-6 min-h-[500px]">
            {activeTab === "info" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <PersonalInfo user={userProfile} />
                </div>
            )}

            {activeTab === "history" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <QuizHistory />
                </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Security Card */}
                <Card className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_black]">
                  <div className="border-b-2 border-black bg-blue-300 px-6 py-4">
                    <h2 className="text-lg font-black uppercase text-black tracking-tight flex items-center gap-2">
                      <ShieldAlert className="fill-blue-100" size={20} />
                      <AnimatedText>Cài đặt bảo mật</AnimatedText>
                    </h2>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      Quản lý mật khẩu và phương thức đăng nhập
                    </p>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                      <div className="mx-auto w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3">
                          <ShieldAlert className="text-slate-400" />
                      </div>
                      <p className="text-sm font-bold text-slate-600">
                        Tính năng đổi mật khẩu chi tiết đang được phát triển.
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Vui lòng quay lại sau để trải nghiệm xác thực 2 bước và lịch sử đăng nhập.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Danger Zone */}
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