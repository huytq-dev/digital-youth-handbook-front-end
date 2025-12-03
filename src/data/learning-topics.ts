import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";

export const LEARNING_TOPICS: LearningTopic[] = [
  {
    id: "ly-tuong",
    title: "Lý tưởng cách mạng & hoài bão của thanh niên thời kỳ mới",
    objectives: [
      "Hiểu rõ vai trò, sứ mệnh của thanh niên trong giai đoạn công nghiệp hóa, hiện đại hóa và hội nhập quốc tế.",
      "Hình thành lý tưởng sống cao đẹp, gắn khát vọng cá nhân với sự phát triển của đất nước.",
      "Biết xây dựng mục tiêu học tập, rèn luyện và cống hiến cụ thể cho bản thân.",
    ],
    content: {
      summary:
        "Chủ đề tập trung làm rõ thế nào là lý tưởng cách mạng của thanh niên Việt Nam thời kỳ mới, vì sao thanh niên cần có hoài bão lớn, và cách biến lý tưởng thành những hành động, việc làm cụ thể trong học tập, lao động và tham gia các hoạt động xã hội.",
      videoUrl: "https://www.youtube.com/embed/PXZc5sJq9KU",
    },
    infographicUrl: "/images/learning-topics/ly-tuong-hoai-bao.jpg",
    infographicUrls: [
      "https://picsum.photos/seed/ly-tuong-1/800/1000",
      "https://picsum.photos/seed/ly-tuong-2/800/1000",
      "https://picsum.photos/seed/ly-tuong-3/800/1000",
      "https://picsum.photos/seed/ly-tuong-4/800/1000",
      "https://picsum.photos/seed/ly-tuong-5/800/1000",
      "https://picsum.photos/seed/ly-tuong-6/800/1000",
      "https://picsum.photos/seed/ly-tuong-7/800/1000",
      "https://picsum.photos/seed/ly-tuong-8/800/1000",
      "https://picsum.photos/seed/ly-tuong-9/800/1000",
      "https://picsum.photos/seed/ly-tuong-10/800/1000",
    ],
    quiz: [
      {
        id: 1,
        question:
          "Lý tưởng sống của thanh niên Việt Nam hiện nay cần gắn liền với điều gì?",
        options: [
          "Lợi ích cá nhân và gia đình",
          "Sự nghiệp xây dựng và bảo vệ Tổ quốc",
          "Xu hướng nghề nghiệp đang “hot” trên mạng xã hội",
          "Việc trở nên nổi tiếng càng sớm càng tốt",
        ],
        correctAnswerIndex: 1,
      },
      {
        id: 2,
        question:
          "Việc đặt mục tiêu học tập, rèn luyện cụ thể giúp thanh niên điều gì?",
        options: [
          "Dễ so sánh bản thân với người khác",
          "Có định hướng rõ ràng để tiến gần hơn tới lý tưởng",
          "Đỡ phải thay đổi kế hoạch trong tương lai",
          "Không cần quan tâm tới hoàn cảnh đất nước",
        ],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    id: "tu-tuong",
    title: "Học tập & làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh",
    objectives: [
      "Nắm được những nội dung cốt lõi trong tư tưởng, đạo đức, phong cách Hồ Chí Minh.",
      "Biết vận dụng vào lối sống, cách ứng xử và phương pháp học tập hằng ngày.",
      "Tự xây dựng kế hoạch rèn luyện theo gương Bác trong môi trường học đường.",
    ],
    content: {
      summary:
        "Chủ đề phân tích các phẩm chất đạo đức cách mạng như: yêu nước, cần – kiệm – liêm – chính, chí công vô tư; phong cách sống giản dị, gần gũi; phong cách làm việc khoa học, dân chủ, tôn trọng nhân dân. Qua đó giúp thanh niên soi chiếu và tự điều chỉnh bản thân.",
      videoUrl: "https://www.youtube.com/embed/xn7vF_1r4yg",
    },
    infographicUrl: "/images/learning-topics/hoc-tap-lam-theo-bac.jpg",
    infographicUrls: [
      "https://picsum.photos/seed/tu-tuong-1/800/1000",
      "https://picsum.photos/seed/tu-tuong-2/800/1000",
      "https://picsum.photos/seed/tu-tuong-3/800/1000",
      "https://picsum.photos/seed/tu-tuong-4/800/1000",
      "https://picsum.photos/seed/tu-tuong-5/800/1000",
      "https://picsum.photos/seed/tu-tuong-6/800/1000",
      "https://picsum.photos/seed/tu-tuong-7/800/1000",
      "https://picsum.photos/seed/tu-tuong-8/800/1000",
      "https://picsum.photos/seed/tu-tuong-9/800/1000",
      "https://picsum.photos/seed/tu-tuong-10/800/1000",
    ],
    quiz: [
      {
        id: 1,
        question:
          "Phẩm chất đạo đức nào sau đây gắn liền với tư tưởng, đạo đức Hồ Chí Minh?",
        options: [
          "Cần, kiệm, liêm, chính, chí công vô tư",
          "Cạnh tranh bằng mọi giá",
          "Đề cao chủ nghĩa cá nhân",
          "Chỉ chú trọng vật chất",
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
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
          "Quay cóp trong giờ kiểm tra để “giúp nhau cùng qua môn”",
          "Viết bình luận mỉa mai bạn trên mạng xã hội",
          "Xả rác bừa bãi trong khuôn viên trường",
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "an-toan-mang",
    title: "Sử dụng mạng xã hội an toàn, lành mạnh",
    objectives: [
      "Hiểu được cơ hội và rủi ro khi tham gia mạng xã hội.",
      "Biết cách bảo vệ dữ liệu cá nhân và hình ảnh bản thân trên môi trường số.",
      "Hình thành thói quen ứng xử văn minh, tránh tin giả và phát ngôn kích động.",
    ],
    content: {
      summary:
        "Chủ đề cung cấp các kiến thức cơ bản về an toàn thông tin, dấu vết số, cách nhận diện tin giả, lừa đảo trực tuyến. Đồng thời hướng dẫn thanh niên xây dựng \"dấu ấn số\" tích cực, biết chọn lọc nội dung, không chia sẻ thông tin chưa kiểm chứng.",
      videoUrl: "https://www.youtube.com/embed/qNBNzL1RM0A",
    },
    infographicUrl: "/images/learning-topics/mang-xa-hoi-an-toan.jpg",
    infographicUrls: [
      "https://picsum.photos/seed/mang-xa-hoi-1/800/1000",
      "https://picsum.photos/seed/mang-xa-hoi-2/800/1000",
      "https://picsum.photos/seed/mang-xa-hoi-3/800/1000",
      "https://picsum.photos/seed/mang-xa-hoi-4/800/1000",
      "https://picsum.photos/seed/mang-xa-hoi-5/800/1000",
      "https://picsum.photos/seed/mang-xa-hoi-6/800/1000",
      "https://picsum.photos/seed/mang-xa-hoi-7/800/1000",
      "https://picsum.photos/seed/mang-xa-hoi-8/800/1000",
      "https://picsum.photos/seed/mang-xa-hoi-9/800/1000",
      "https://picsum.photos/seed/mang-xa-hoi-10/800/1000",
    ],
    quiz: [
      {
        id: 1,
        question:
          "Việc nào sau đây giúp bạn sử dụng mạng xã hội an toàn hơn?",
        options: [
          "Đặt mật khẩu dễ nhớ như ngày sinh và chia sẻ cho bạn thân.",
          "Đăng mọi thông tin cá nhân lên trang cá nhân để “không giấu gì nhau”.",
          "Bật xác thực hai lớp (2FA) và không bấm vào link lạ.",
          "Tham gia mọi nhóm kín để xem thông tin “nội bộ”.",
        ],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: "tinh-nguyen",
    title: "Thanh niên tình nguyện - Chung tay xây dựng quê hương",
    objectives: [
      "Hiểu được ý nghĩa của các phong trào thanh niên tình nguyện.",
      "Khơi dậy tinh thần xung kích, sẵn sàng cống hiến cho cộng đồng.",
      "Biết cách tham gia một hoạt động tình nguyện phù hợp với khả năng.",
    ],
    content: {
      summary:
        "Chủ đề giới thiệu các mô hình tình nguyện thiết thực như: tiếp sức mùa thi, mùa hè xanh, hiến máu nhân đạo, hỗ trợ vùng khó khăn, bảo vệ môi trường... Qua đó giúp thanh niên thấy được niềm vui khi cho đi và trách nhiệm với quê hương, đất nước.",
      videoUrl: "https://www.youtube.com/embed/XUqHVyZf9Mk",
    },
    infographicUrl: "/images/learning-topics/thanh-nien-tinh-nguyen.jpg",
    infographicUrls: [
      "https://picsum.photos/seed/tinh-nguyen-1/800/1000",
      "https://picsum.photos/seed/tinh-nguyen-2/800/1000",
      "https://picsum.photos/seed/tinh-nguyen-3/800/1000",
      "https://picsum.photos/seed/tinh-nguyen-4/800/1000",
      "https://picsum.photos/seed/tinh-nguyen-5/800/1000",
      "https://picsum.photos/seed/tinh-nguyen-6/800/1000",
      "https://picsum.photos/seed/tinh-nguyen-7/800/1000",
      "https://picsum.photos/seed/tinh-nguyen-8/800/1000",
      "https://picsum.photos/seed/tinh-nguyen-9/800/1000",
      "https://picsum.photos/seed/tinh-nguyen-10/800/1000",
    ],
    quiz: [
      {
        id: 1,
        question:
          "Ý nghĩa quan trọng nhất của hoạt động thanh niên tình nguyện là gì?",
        options: [
          "Giúp bạn có thêm ảnh đẹp đăng mạng xã hội.",
          "Rèn luyện tinh thần trách nhiệm và đóng góp cho cộng đồng.",
          "Làm cho hồ sơ xin việc “đẹp” hơn.",
          "Giúp bạn tránh phải học thêm ngoài giờ.",
        ],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
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
          "Chia sẻ mọi thông tin chưa kiểm chứng lên mạng để “cảnh báo”.",
          "Tự ý sử dụng phần mềm lậu để tiết kiệm chi phí.",
          "Sử dụng dịch vụ công trực tuyến, thanh toán không tiền mặt an toàn.",
          "Đăng nhập tài khoản ở máy lạ và lưu luôn mật khẩu cho tiện.",
        ],
        correctAnswerIndex: 2,
      },
    ],
  },
];


