import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";

export const vanHoaTopic: LearningTopic = {
  id: "van-hoa",
  title: "Văn hóa học đường - Lối sống đẹp trong thanh niên",
  objectives: [
    "Nhận diện được các biểu hiện của văn hóa học đường tích cực và tiêu cực.",
    "Xây dựng thái độ tôn trọng thầy cô, bạn bè, nhân viên nhà trường và cộng đồng.",
    "Thực hành lối sống văn minh, kỷ luật, biết lắng nghe và chia sẻ.",
  ],
  content: {
    summary:
      "Chủ đề nhấn mạnh ý nghĩa của môi trường học đường lành mạnh, nói không với bạo lực, nói xấu, kỳ thị. Thanh niên được định hướng xây dựng lối sống đẹp qua những việc làm cụ thể như: giữ gìn vệ sinh, đúng giờ, trung thực trong thi cử, sống chan hòa, tôn trọng sự khác biệt.",
    videoUrl: "https://www.youtube.com/embed/5X8v6aYQc8w",
  },
  infographicUrl: "/images/learning-topics/van-hoa-hoc-duong.jpg",
  infographicUrls: [
    "https://picsum.photos/seed/van-hoa-1/800/1000",
    "https://picsum.photos/seed/van-hoa-2/800/1000",
    "https://picsum.photos/seed/van-hoa-3/800/1000",
    "https://picsum.photos/seed/van-hoa-4/800/1000",
    "https://picsum.photos/seed/van-hoa-5/800/1000",
    "https://picsum.photos/seed/van-hoa-6/800/1000",
    "https://picsum.photos/seed/van-hoa-7/800/1000",
    "https://picsum.photos/seed/van-hoa-8/800/1000",
    "https://picsum.photos/seed/van-hoa-9/800/1000",
    "https://picsum.photos/seed/van-hoa-10/800/1000",
  ],
  quiz: [
    {
      id: 1,
      question: "Hành vi nào sau đây thể hiện văn hóa học đường tốt?",
      options: [
        "Chia sẻ tài liệu ôn tập cho bạn cùng lớp",
        'Quay cóp trong giờ kiểm tra để "giúp nhau cùng qua môn"',
        "Viết bình luận mỉa mai bạn trên mạng xã hội",
        "Xả rác bừa bãi trong khuôn viên trường",
      ],
      correctAnswerIndex: 0,
    },
  ],
};

