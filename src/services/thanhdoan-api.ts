/**
 * Service: dữ liệu Tiêu điểm nổi bật từ Thành Đoàn Đà Nẵng
 * Hiện tại dùng static mock 4 bài cố định (title + mô tả + ảnh + link).
 */

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
        "Chương trình 'Tư vấn và hỗ trợ các ý tưởng, mô hình khởi nghiệp, lập nghiệp của thanh niên trong lĩnh vực bảo vệ môi trường, ứng phó với biến đổi khí hậu'",
      description:
        "Sáng ngày 12/11/2025, Ban Thường vụ Thành Đoàn Đà Nẵng tổ chức Chương trình 'Tư vấn và hỗ trợ các ý tưởng, mô hình khởi nghiệp, lập nghiệp của thanh niên trong lĩnh vực bảo vệ môi trường, ứng phó với biến đổi khí hậu'.",
      category: "Hoạt Động",
      author: "Thành Đoàn Đà Nẵng",
      date: "13/11/2025",
      imageUrl:
        "http://thanhdoandanang.org.vn/wp-content/uploads/2025/11/%C4%91%E1%BB%81-t%C3%A0i-b%E1%BA%A3o-v%E1%BB%87-m%C3%B4i-tr%C6%B0%E1%BB%9Dng-4-1024x683.jpg",
      likes: 350,
      comments: 88,
      isHot: true,
      url: "http://thanhdoandanang.org.vn/archives/24955",
    },
    {
      id: 2,
      title:
        "Mô hình dân vận khéo: “mỗi tháng một địa chỉ yêu thương thương”",
      description:
        "Trong hành trình đồng hành cùng thiếu nhi thành phố, có những mô hình không ồn ào, không phô trương, nhưng âm thầm gieo mầm yêu thương.",
      category: "Môi Trường",
      author: "Thành Đoàn Đà Nẵng",
      date: "07/07/2025",
      imageUrl:
        "http://thanhdoandanang.org.vn/wp-content/uploads/2025/08/cong-trinh-1-1.jpg",
      likes: 215,
      comments: 41,
      isHot: true,
      url: "http://thanhdoandanang.org.vn/archives/24869",
    },
    {
      id: 3,
      title:
        "127 THÍ SINH THAM GIA HỘI THI HUẤN LUYỆN VIÊN CẤP I THÀNH PHỐ",
      description:
        "Thực hiện Chương trình công tác Hội và phong trào thanh niên năm 2024; thiết thực hưởng ứng các hoạt động chào mừng kỷ niệm 68 năm ngày truyền thống Hội LHTN Việt Nam (15/10/1956-15/10/2024).",
      category: "Tập Huấn",
      author: "Thành Đoàn Đà Nẵng",
      date: "09/09/2024",
      imageUrl:
        "http://thanhdoandanang.org.vn/wp-content/uploads/2024/09/z5812747778795_1053b1d0a2548b7ebfb1c721c50ae154.jpg",
      likes: 190,
      comments: 30,
      isHot: false,
      url: "http://thanhdoandanang.org.vn/archives/23682",
    },
    {
      id: 4,
      title:
        "Câu lạc bộ tư vấn, trợ giúp trẻ em đồng hành hỗ trợ thiếu nhi có hoàn cảnh đặc biệt trên địa bàn thành phố",
      description:
        "Trong suốt thời gian qua, Câu lạc bộ Tư vấn, Trợ giúp Trẻ em thành phố Đà Nẵng đã tích cực và chủ động đồng hành, hỗ trợ thiết thực cho nhiều trường hợp thiếu nhi có hoàn cảnh đặc biệt, khó khăn",
      category: "Hội Nghị",
      author: "Thành Đoàn Đà Nẵng",
      date: "20/11/2025",
      imageUrl:
        "http://thanhdoandanang.org.vn/wp-content/uploads/2025/11/1493694905650821010-1024x682.jpg",
      likes: 150,
      comments: 25,
      isHot: false,
      url: "http://thanhdoandanang.org.vn/archives/24940",
    },
  ];
}

// Public helper để LandingPromotions dùng trực tiếp bộ 4 bài mẫu (không cần fetch / không có warning lint)
export function getThanhDoanSampleArticles(): ThanhDoanArticle[] {
  return getSampleArticles();
}
