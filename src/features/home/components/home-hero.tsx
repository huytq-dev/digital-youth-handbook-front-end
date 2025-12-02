import { ArrowRight, BookOpenCheck, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/primitives";
import { AnimatedText } from "@/components/animated-text";

export const HomeHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 -translate-x-16 skew-x-[-12deg] bg-blue-100/40" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:gap-20 lg:px-8">
        {/* Left content */}
        <div className="space-y-8 lg:w-1/2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <AnimatedText>Digital Youth Handbook</AnimatedText>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
            <AnimatedText animationType="slideUp">
              Bản đồ kỹ năng{" "}
              <span className="text-blue-600">Thanh niên số</span> <br />
              cho{" "}
              <span className="text-orange-500">
                học tập &amp; sự nghiệp
              </span>
            </AnimatedText>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-gray-600">
            <AnimatedText animationType="fade">
              Tổng hợp lộ trình, công cụ và kinh nghiệm thực tế để bạn tự
              xây dựng con đường phát triển của riêng mình trong kỷ nguyên số.
            </AnimatedText>
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="gap-2 rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-blue-500/30"
            >
              <AnimatedText>Bắt đầu với gợi ý hôm nay</AnimatedText>
              <ArrowRight size={20} />
            </Button>
            <Link to="/learning-topics">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-2 bg-white font-bold text-gray-700 shadow-md transition-colors duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <AnimatedText>Xem tất cả chủ đề</AnimatedText>
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookOpenCheck
                size={18}
                className="text-blue-600"
              />
              <AnimatedText>Hơn 50+ gợi ý lộ trình</AnimatedText>
            </div>
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-orange-500" />
              <AnimatedText>Cá nhân hóa theo mục tiêu của bạn</AnimatedText>
            </div>
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white/40 shadow-2xl backdrop-blur-md">
            <img
              src="https://picsum.photos/1000/520?random=45"
              alt="Digital Youth Planning"
              className="h-[460px] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6">
              <span className="mb-2 inline-flex items-center gap-2 rounded-md bg-indigo-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                <AnimatedText>GỢI Ý HÔM NAY</AnimatedText>
              </span>
              <h3 className="mb-1 text-xl font-bold text-white">
                <AnimatedText>
                  Xây dựng hồ sơ cá nhân nổi bật trong 30 ngày
                </AnimatedText>
              </h3>
              <p className="text-xs text-gray-200">
                <AnimatedText>
                  Checklist từng bước cho CV, LinkedIn, Portfolio và kỹ năng
                  mềm cốt lõi.
                </AnimatedText>
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-white/90 p-5 shadow-xl md:block">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                4.8
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500">
                  <AnimatedText>Đánh giá trung bình</AnimatedText>
                </p>
                <p className="text-sm font-bold text-gray-900">
                  <AnimatedText>Hơn 2.000 bạn trẻ đã áp dụng</AnimatedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


