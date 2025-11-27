import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/primitives";

export const LandingHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16 lg:py-24">
      <div className="absolute right-0 top-0 h-full w-1/2 -translate-x-20 skew-x-[-12deg] bg-blue-100/30" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="space-y-8 lg:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Thanh niên Việt Nam - Vững bước tương lai
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
              Xây dưỡng <span className="text-blue-600">Tâm Trong</span> <br />
              Rèn luyện <span className="text-orange-500">Trí Sáng</span> <br />
              Xây dựng <span className="text-blue-600">Hoài Bão Lớn</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-gray-600">
              Nơi kết nối những trái tim nhiệt huyết, chia sẻ những câu chuyện
              đẹp về lý tưởng cách mạng và lan tỏa lối sống tích cực đến cộng
              đồng Gen Z.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-blue-500/30"
              >
                Khám Phá Ngay <ArrowRight size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-2 bg-white font-bold text-gray-700 shadow-md hover:border-gray-200 hover:bg-gray-50"
              >
                Tìm Hiểu Thêm
              </Button>
            </div>
          </div>
          {/* Right Image */}
          <div className="relative w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl transition-transform duration-500 hover:rotate-0 rotate-3">
              <img
                src="https://picsum.photos/1000/500?random=10"
                alt="Youth Volunteer"
                className="h-[500px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                <span className="mb-3 inline-block rounded-md bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                  TIÊU ĐIỂM THÁNG
                </span>
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Thanh niên Đà Nẵng: Sẵn sàng vì cộng đồng
                </h3>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-yellow-400 p-6 shadow-xl md:block">
              <div className="text-center">
                <span className="block text-3xl font-black text-blue-900">
                  93+
                </span>
                <span className="text-xs font-bold uppercase text-blue-800">
                  Năm thành lập Đoàn
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
