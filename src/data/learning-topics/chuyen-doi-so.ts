import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";

export const chuyenDoiSoTopic: LearningTopic = {
  id: "chuyen-doi-so",
  title: "Chuyển đổi số & kỹ năng công dân số",
  objectives: [
    "Nắm được khái niệm cơ bản về chuyển đổi số và vai trò của thanh niên.",
    "Biết sử dụng các nền tảng số phục vụ học tập, làm việc và cuộc sống.",
    "Nhận thức được trách nhiệm của công dân số: tôn trọng pháp luật, bảo vệ môi trường số an toàn.",
  ],
  content: {
    summary:
      "Chủ đề giúp thanh niên hiểu chuyển đổi số không chỉ là công nghệ, mà còn là thay đổi cách nghĩ, cách làm. Mỗi bạn trẻ là một công dân số cần chủ động học kỹ năng mới, sử dụng dịch vụ công trực tuyến, thanh toán điện tử, lưu trữ tài liệu số và bảo mật thông tin cá nhân.",
    videoUrl: "https://www.youtube.com/embed/bXaYhp-DLF8",
  },
  infographicUrl: "/images/learning-topics/chuyen-doi-so.jpg",
  infographicUrls: [
    "https://picsum.photos/seed/chuyen-doi-so-1/800/1000",
    "https://picsum.photos/seed/chuyen-doi-so-2/800/1000",
    "https://picsum.photos/seed/chuyen-doi-so-3/800/1000",
    "https://picsum.photos/seed/chuyen-doi-so-4/800/1000",
    "https://picsum.photos/seed/chuyen-doi-so-5/800/1000",
    "https://picsum.photos/seed/chuyen-doi-so-6/800/1000",
    "https://picsum.photos/seed/chuyen-doi-so-7/800/1000",
    "https://picsum.photos/seed/chuyen-doi-so-8/800/1000",
    "https://picsum.photos/seed/chuyen-doi-so-9/800/1000",
    "https://picsum.photos/seed/chuyen-doi-so-10/800/1000",
  ],
  quiz: [
    {
      id: 1,
      question: "Hành vi nào thể hiện trách nhiệm của một công dân số?",
      options: [
        'Chia sẻ mọi thông tin chưa kiểm chứng lên mạng để "cảnh báo".',
        "Tự ý sử dụng phần mềm lậu để tiết kiệm chi phí.",
        "Sử dụng dịch vụ công trực tuyến, thanh toán không tiền mặt an toàn.",
        "Đăng nhập tài khoản ở máy lạ và lưu luôn mật khẩu cho tiện.",
      ],
      correctAnswerIndex: 2,
    },
  ],
};

