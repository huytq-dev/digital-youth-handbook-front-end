import highlightVolunteer from "@/assets/promotions-images/hoi_nghi_thang_1.jpg";
import highlightTraining from "@/assets/promotions-images/ban_thuong_vu.jpg";

export interface ThanhDoanArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  likes: number;
  comments: number;
  isHot: boolean;
  url?: string;
}

/**
 * Bộ 4 bài viết tiêu điểm (static data)
 */
function getSampleArticles(): ThanhDoanArticle[] {
  return [
    {
      id: 1,
      title:
        "Cuộc thi “DANANG GREEN FUTURE SOLUTIONS – Sáng kiến xanh cho Đà Nẵng đáng sống",
      description:
        "Cuộc thi dành cho học sinh các trường THPT, Trung tâm GDTX – TCCN, PTDTNT trên địa bàn thành phố, tham gia theo hình thức đội thi từ 2–4 thành viên, với các ý tưởng, giải pháp sáng tạo gắn với mục tiêu phát triển bền vững (SDGs), xây dựng thành phố thông minh và phát triển bền vững.",
      category: "Hoạt Động",
      author: "Thành Đoàn Đà Nẵng",
      date: "12/11/2025",
      imageUrl: "https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/624534242_1376805471147431_3217009445352450075_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=nDZCS2V-oZsQ7kNvwEdIjty&_nc_oc=AdkW4BGivLJmh1LDSsFCrW4zWwg8hsaoRmnBVRqPyUVqY9muVDrpLH14B1r9-f6e5-o&_nc_zt=23&_nc_ht=scontent.fdad2-1.fna&_nc_gid=WABzmj-_lT0nXtLa6JNuBg&oh=00_AfsicGfakAMz3HozyJTWX4VDdbceQ4JkjEBtNnoWZvl3Hw&oe=698A29CE",
      likes: 350,
      comments: 88,
      isHot: true,
      url: "https://www.facebook.com/share/p/1MBuux5KCV/?mibextid=wwXIfr",
    },
    {
      id: 2,
      title:
        "Hội nghị trù bị Kỳ họp thứ I – Hội đồng trẻ em thành phố Đà Nẵng giai đoạn 2025-2026",
      description:
        "Chiều ngày 15/11/2025, không khí làm việc nghiêm túc và trách nhiệm đã diễn ra tại Hội nghị trù bị, một bước chuẩn bị then chốt cho Kỳ họp thứ I của Hội đồng Trẻ em thành phố Đà Nẵng giai đoạn 2025 – 2026. Hội nghị có sự tham gia của 67 đại biểu chính thức và đại biểu dự khuyết của Hội đồng trẻ em cấp thành phố giai đoạn 2025 – 2026 – Hội đồng trẻ em đầu tiên sau giai đoạn sáp nhập các tỉnh, thành. Chương trình trù bị tập trung vào công tác tập huấn chuyên môn sâu do các chuyên gia của Câu lạc bộ Tư vấn, trợ giúp trẻ em thành phố Đà Nẵng trực tiếp hướng dẫn.",
      category: "Môi Trường",
      author: "Thành Đoàn Đà Nẵng",
      date: "15/11/2025",
      imageUrl: highlightVolunteer,
      likes: 215,
      comments: 41,
      isHot: true,
      url: "http://thanhdoandanang.org.vn/archives/24925",
    },
    {
      id: 3,
      title:
        "Ban Thường vụ Thành Đoàn tổ chức kiểm tra công tác Đoàn và phong trào thanh thiếu nhi 6 tháng cuối năm 2025",
      description:
        "TThực hiện Kế hoạch số 379-KH/TĐTN-TCKT ngày 14/2/2025 của Ban Thường vụ Thành Đoàn về việc kiểm tra, giám sát năm 2025, nhằm kịp thời nắm bắt nhu cầu, nguyện vọng của cán bộ, đoàn viên, thanh thiếu nhi; phát hiện và nhân rộng những mô hình tiêu biểu, điển hình tiên tiến, đồng thời đề ra giải pháp khắc phục những tồn tại,",
      category: "Tập Huấn",
      author: "Thành Đoàn Đà Nẵng",
      date: "15/11/2025",
      imageUrl: highlightTraining,
      likes: 190,
      comments: 30,
      isHot: false,
      url: "http://thanhdoandanang.org.vn/archives/21513",
    },
    {
      id: 4,
      title:
        "Kỷ niệm 96 năm Ngày thành lập Đảng Cộng sản Việt Nam (3/2/1930 - 3/2/2026)",
      description:
        "Dự lễ viếng có các đồng chí: Ủy viên Bộ Chính trị, Tổng Bí thư Tô Lâm; Chủ tịch nước Lương Cường; Thủ tướng Chính phủ Phạm Minh Chính; Ủy viên Bộ Chính trị, Chủ tịch Quốc hội Trần Thanh Mẫn; Ủy viên Bộ Chính trị, Thường trực Ban Bí thư Trần Cẩm Tú; Ủy viên Bộ Chính trị, Bí thư Trung ương Đảng, Chủ tịch Ủy ban Trung ương Mặt trận Tổ quốc Việt Nam Bùi Thị Minh Hoài.",
      category: "Hội Nghị",
      author: "Thành Đoàn Đà Nẵng",
      date: "20/11/2025",
      imageUrl: "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/627052307_1376794174481894_6278394608634977741_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=pvH5G2u7cSEQ7kNvwH9LJk6&_nc_oc=Adml_nt7JaRqojnue_aWja2_M9RJ1nZoqFxkqIi6LOyTMnQUIaoryBYXX3GhzRVgezw&_nc_zt=23&_nc_ht=scontent.fdad1-3.fna&_nc_gid=WABzmj-_lT0nXtLa6JNuBg&oh=00_AftP2kCIeMdY7Xhce3T-_TMn3F-Of0B-hGBdZXmiccsakw&oe=698A2562",
      likes: 150,
      comments: 25,
      isHot: false,
      url: "https://www.facebook.com/share/p/14SSNq7eSkQ/?mibextid=wwXIfr",
    },
  ];
}

// Public helper để LandingPromotions dùng trực tiếp bộ 4 bài mẫu (không cần fetch / không có warning lint)
export function getThanhDoanSampleArticles(): ThanhDoanArticle[] {
  return getSampleArticles();
}
