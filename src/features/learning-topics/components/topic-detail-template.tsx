import type { LearningTopic } from "../learning-topics.type";
import { QuizSection } from "./quiz-section";
import { BookOpen, Target, Video, Image as ImageIcon, Star, Share2 } from "lucide-react";
import { FunFactCard, ResourceCard, TableOfContents } from "./topic-widgets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TopicDetailTemplateProps {
  topic: LearningTopic;
}

const doodleDotPattern = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E";

export const TopicDetailTemplate = ({ topic }: TopicDetailTemplateProps) => {
  return (
    <div 
      className="min-h-screen bg-[#fff9f0] pb-24 pt-12 font-sans text-slate-900 relative"
      style={{ backgroundImage: `url("${doodleDotPattern}")` }}
    >
      {/* Background Decor - Wrapped in overflow-hidden container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-yellow-400 opacity-20 animate-spin-slow">
          <Star size={100} strokeWidth={1} />
        </div>
      </div>
      
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        
        {/* HEADER LỚN */}
        <header className="mb-12 text-center">
          <div className="inline-block bg-yellow-300 border-2 border-black px-4 py-1.5 rounded-sm shadow-[4px_4px_0px_black] mb-6 rotate-[-2deg]">
              <p className="text-xs font-black uppercase tracking-widest text-black">
              Chuyên đề học tập
              </p>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-900 uppercase tracking-tight bg-white/80 backdrop-blur-sm inline-block px-8 py-4 rounded-2xl border-2 border-dashed border-slate-400">
            {topic.title}
          </h1>
        </header>

        {/* --- MAIN LAYOUT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* === LEFT CONTENT (8 cols) === */}
            <div className="lg:col-span-8 space-y-12">
                
                {/* 1. OBJECTIVES - Thêm ID */}
                <section id="section-objectives" className="relative group scroll-mt-24">
                    <div className="absolute inset-0 bg-blue-500 rounded-xl translate-x-2 translate-y-2 border-2 border-black" />
                    <div className="relative rounded-xl border-2 border-black bg-white p-8">
                        <h2 className="mb-6 flex items-center text-2xl font-black text-blue-600 uppercase border-b-2 border-dashed border-blue-200 pb-2 w-fit">
                            <Target className="mr-3" size={28} strokeWidth={2.5} />
                            Mục tiêu
                        </h2>
                        <ul className="space-y-4">
                            {topic.objectives.map((obj, index) => (
                            <li key={index} className="flex items-start text-base font-bold text-slate-700">
                                <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-black text-blue-700 border-2 border-black shadow-[2px_2px_0px_black]">
                                    {index + 1}
                                </span>
                                <span className="mt-1">{obj}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 2. CONTENT TEXT & VIDEO - Thêm ID */}
                <section id="section-content" className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black] scroll-mt-24">
                    <h2 className="mb-4 flex items-center text-xl font-black text-black uppercase bg-green-200 w-fit px-3 py-1 border-2 border-black rounded-lg -rotate-1">
                        <BookOpen className="mr-2" size={20} strokeWidth={2.5} />
                        Nội dung trọng tâm
                    </h2>
                    <p className="mb-6 text-sm font-medium leading-relaxed text-slate-700 border-l-4 border-green-200 pl-4">
                        {topic.content.summary}
                    </p>

                    {topic.content.videoUrl && (
                        <div className="group relative overflow-hidden rounded-lg border-2 border-black bg-black ring-offset-2 ring-black hover:ring-2 transition-all">
                        <div className="aspect-video">
                            <iframe
                            src={topic.content.videoUrl}
                            title="Video bài giảng"
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            />
                        </div>
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_black] flex items-center gap-1 animate-pulse">
                            <Video size={12} /> LIVE
                        </div>
                        </div>
                    )}
                </section>

                {/* 3. INFOGRAPHIC - Thêm ID */}
                <section id="section-infographic" className="rounded-xl border-2 border-black bg-white p-2 shadow-[6px_6px_0px_black] scroll-mt-24">
                    <div className="border-b-2 border-black bg-purple-100 p-3 mb-2 flex items-center justify-between rounded-t-lg">
                        <h2 className="text-lg font-black text-purple-900 uppercase flex items-center">
                            <ImageIcon className="mr-2" size={20} /> Infographic
                        </h2>
                        {/* Windows controls fake */}
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full border-2 border-black bg-red-400" />
                            <div className="w-3 h-3 rounded-full border-2 border-black bg-yellow-400" />
                        </div>
                    </div>
                    
                    {/* Carousel cho nhiều infographic */}
                    {(() => {
                        const infographicUrls = topic.infographicUrls;
                        if (infographicUrls && infographicUrls.length > 0) {
                            return (
                                <div className="px-4 py-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <Carousel
                                        opts={{
                                            align: "start",
                                            loop: true,
                                        }}
                                        className="w-full"
                                    >
                                        <CarouselContent className="-ml-2 md:-ml-4">
                                            {infographicUrls.map((url, index) => (
                                                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                                                    <div className="relative overflow-hidden rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_black] hover:-translate-y-1 hover:shadow-[4px_4px_0px_black] transition-all h-full">
                                                        <div className="aspect-[3/4] flex items-center justify-center bg-slate-100">
                                                            <img
                                                                src={url}
                                                                alt={`${topic.title} - Ảnh ${index + 1}`}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        {/* Số thứ tự ảnh */}
                                                        <div className="absolute top-2 right-2 bg-yellow-300 text-black text-xs font-black px-2 py-1 rounded-md border-2 border-black z-10">
                                                            Ảnh {index + 1}/{infographicUrls.length}
                                                        </div>
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="border-2 border-black bg-white hover:bg-yellow-300 text-black -left-4" />
                                        <CarouselNext className="border-2 border-black bg-white hover:bg-yellow-300 text-black -right-4" />
                                    </Carousel>
                                </div>
                            );
                        } else if (topic.infographicUrl) {
                            return (
                                // Fallback: Hiển thị ảnh đơn nếu chỉ có infographicUrl
                                <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 min-h-[300px] flex items-center justify-center">
                                    <img
                                        src={topic.infographicUrl}
                                        alt={topic.title}
                                        className="h-full w-full object-contain max-h-[500px]"
                                    />
                                </div>
                            );
                        }
                        return null;
                    })()}
                </section>

                {/* 4. QUIZ - Thêm ID */}
                <section id="section-quiz" className="scroll-mt-24">
                    <QuizSection questions={topic.quiz} />
                </section>

            </div>

            {/* === RIGHT SIDEBAR (4 cols) - Sticky === */}
            <div className="lg:col-span-4">
                {/* Sticky wrapper */}
                <div className="sticky top-24 space-y-8 h-fit">
                    
                    {/* Widget 1: Mục lục */}
                    <TableOfContents />

                    {/* Widget 2: Góc Mách Nhỏ */}
                    <FunFactCard />

                    {/* Widget 3: Tài liệu */}
                    <ResourceCard />

                    {/* Button Chia sẻ */}
                    <button className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-slate-800 hover:scale-[1.02] transition-all">
                        <Share2 size={18} /> CHIA SẺ CHỦ ĐỀ NÀY
                    </button>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
};