
/**
 * @typedef {object} Article
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} author
 * @property {string} date - Ngày đăng (ví dụ: "24/11/2025")
 * @property {string} imageUrl
 * @property {number} likes
 * @property {number} comments
 * @property {boolean} isHot - Bài viết nổi bật
 */

/**
 * @type {Article[]}
 */
export const ARTICLES = [
  {
    id: 1,
    title:
      "Tấm gương đạo đức Hồ Chí Minh: Bài học cho thế hệ trẻ ngày nay",
    description:
      "Phân tích những giá trị cốt lõi trong tư tưởng đạo đức Hồ Chí Minh và ứng dụng vào cuộc sống, học tập của thanh thiếu niên.",
    category: "Đạo Đức",
    author: "Thanh Niên Việt",
    date: "27/11/2025",
    imageUrl: "https://picsum.photos/800/600?random=1",
    likes: 350,
    comments: 88,
    isHot: true,
  },
  {
    id: 2,
    title: "Xây dựng lý tưởng sống: Hành trang không thể thiếu của tuổi trẻ",
    description:
      "Làm thế nào để thanh niên xác định và kiên trì theo đuổi lý tưởng, góp phần vào sự phát triển của đất nước.",
    category: "Lý Tưởng Sống",
    author: "Ban Tuyên Giáo",
    date: "25/11/2025",
    imageUrl: "https://picsum.photos/800/600?random=2",
    likes: 215,
    comments: 41,
    isHot: false,
  },
  {
    id: 3,
    title: "Vai trò của thanh niên trong công cuộc chuyển đổi số quốc gia",
    description:
      "Thanh niên là lực lượng nòng cốt trong việc tiếp thu và làm chủ công nghệ, đóng góp vào quá trình hiện đại hóa đất nước.",
    category: "Công Nghệ & Phát Triển",
    author: "Tổ Quốc Trẻ",
    date: "24/11/2025",
    imageUrl: "https://picsum.photos/800/600?random=3",
    likes: 190,
    comments: 30,
    isHot: true,
  },
  {
    id: 4,
    title: "Sức mạnh của tình nguyện: Tuổi trẻ cống hiến vì cộng đồng",
    description:
      "Tổng hợp các hoạt động tình nguyện ý nghĩa và lời kêu gọi thanh niên tham gia xây dựng lối sống đẹp, trách nhiệm.",
    category: "Hoạt Động Cộng Đồng",
    author: "Mùa Hè Xanh",
    date: "22/11/2025",
    imageUrl: "https://picsum.photos/800/600?random=4",
    likes: 150,
    comments: 25,
    isHot: false,
  },
];

/**
 * @typedef {object} SidebarNewsItem
 * @property {number} id
 * @property {string} title - Tiêu đề tin tức
 * @property {string} imageUrl - URL ảnh thumbnail
 * @property {string} timestamp - Thời gian đăng (ví dụ: "Vừa xong • Tin nóng")
 */

/**
 * @type {SidebarNewsItem[]}
 */
export const SIDEBAR_NEWS = [
  {
    id: 1,
    title: "Hội nghị tuyên dương thanh niên tiên tiến làm theo lời Bác năm 2025",
    imageUrl: "https://picsum.photos/100/100?random=101",
    timestamp: "Vừa xong • Tin nóng",
  },
  {
    id: 2,
    title: "Chương trình tình nguyện mùa đông ấm áp tại vùng cao",
    imageUrl: "https://picsum.photos/100/100?random=102",
    timestamp: "5 phút trước • Hoạt động",
  },
  {
    id: 3,
    title: "Cuộc thi sáng tạo khởi nghiệp thanh niên 2025 chính thức khởi động",
    imageUrl: "https://picsum.photos/100/100?random=103",
    timestamp: "15 phút trước • Tin nóng",
  },
  {
    id: 4,
    title: "Workshop kỹ năng số cho thanh niên tại Hà Nội",
    imageUrl: "https://picsum.photos/100/100?random=104",
    timestamp: "30 phút trước • Sự kiện",
  },
  {
    id: 5,
    title: "Chiến dịch thanh niên tình nguyện hè 2025: Đăng ký bắt đầu",
    imageUrl: "https://picsum.photos/100/100?random=105",
    timestamp: "1 giờ trước • Thông báo",
  },
  {
    id: 6,
    title: "Hội thảo về phát triển bền vững và vai trò của thế hệ trẻ",
    imageUrl: "https://picsum.photos/100/100?random=106",
    timestamp: "1 giờ trước • Sự kiện",
  },
  {
    id: 7,
    title: "Ra mắt nền tảng học tập trực tuyến dành cho thanh niên",
    imageUrl: "https://picsum.photos/100/100?random=107",
    timestamp: "2 giờ trước • Tin nóng",
  },
  {
    id: 8,
    title: "Cuộc thi viết về tấm gương thanh niên tiêu biểu 2025",
    imageUrl: "https://picsum.photos/100/100?random=108",
    timestamp: "2 giờ trước • Hoạt động",
  },
  {
    id: 9,
    title: "Chương trình đối thoại giữa thanh niên và lãnh đạo địa phương",
    imageUrl: "https://picsum.photos/100/100?random=109",
    timestamp: "3 giờ trước • Sự kiện",
  },
  {
    id: 10,
    title: "Hội nghị kết nối doanh nghiệp và thanh niên khởi nghiệp",
    imageUrl: "https://picsum.photos/100/100?random=110",
    timestamp: "3 giờ trước • Tin nóng",
  },
  {
    id: 11,
    title: "Chương trình tư vấn hướng nghiệp cho học sinh cuối cấp",
    imageUrl: "https://picsum.photos/100/100?random=111",
    timestamp: "4 giờ trước • Hoạt động",
  },
  {
    id: 12,
    title: "Festival văn hóa thanh niên các dân tộc Việt Nam 2025",
    imageUrl: "https://picsum.photos/100/100?random=112",
    timestamp: "5 giờ trước • Sự kiện",
  },
  {
    id: 13,
    title: "Ra mắt ứng dụng quản lý hoạt động thanh niên số hóa",
    imageUrl: "https://picsum.photos/100/100?random=113",
    timestamp: "6 giờ trước • Tin nóng",
  },
  {
    id: 14,
    title: "Chiến dịch bảo vệ môi trường xanh của thanh niên",
    imageUrl: "https://picsum.photos/100/100?random=114",
    timestamp: "7 giờ trước • Hoạt động",
  },
  {
    id: 15,
    title: "Hội thảo về an toàn thông tin và bảo mật dữ liệu cho giới trẻ",
    imageUrl: "https://picsum.photos/100/100?random=115",
    timestamp: "8 giờ trước • Sự kiện",
  },
  {
    id: 16,
    title: "Cuộc thi tìm kiếm tài năng trẻ trong lĩnh vực công nghệ",
    imageUrl: "https://picsum.photos/100/100?random=116",
    timestamp: "9 giờ trước • Tin nóng",
  },
  {
    id: 17,
    title: "Chương trình giao lưu văn hóa thanh niên ASEAN 2025",
    imageUrl: "https://picsum.photos/100/100?random=117",
    timestamp: "10 giờ trước • Sự kiện",
  },
  {
    id: 18,
    title: "Workshop phát triển kỹ năng lãnh đạo cho thanh niên",
    imageUrl: "https://picsum.photos/100/100?random=118",
    timestamp: "11 giờ trước • Hoạt động",
  },
  {
    id: 19,
    title: "Chương trình tình nguyện dạy học cho trẻ em vùng khó khăn",
    imageUrl: "https://picsum.photos/100/100?random=119",
    timestamp: "12 giờ trước • Tin nóng",
  },
  {
    id: 20,
    title: "Hội nghị thanh niên với chủ đề 'Khởi nghiệp sáng tạo'",
    imageUrl: "https://picsum.photos/100/100?random=120",
    timestamp: "13 giờ trước • Sự kiện",
  },
  {
    id: 21,
    title: "Ra mắt chương trình đào tạo kỹ năng số cho 10.000 thanh niên",
    imageUrl: "https://picsum.photos/100/100?random=121",
    timestamp: "14 giờ trước • Tin nóng",
  },
  {
    id: 22,
    title: "Cuộc thi thiết kế sản phẩm sáng tạo phục vụ cộng đồng",
    imageUrl: "https://picsum.photos/100/100?random=122",
    timestamp: "15 giờ trước • Hoạt động",
  },
  {
    id: 23,
    title: "Chương trình hỗ trợ thanh niên khởi nghiệp với vốn ưu đãi",
    imageUrl: "https://picsum.photos/100/100?random=123",
    timestamp: "1 ngày trước • Tin nóng",
  },
  {
    id: 24,
    title: "Hội thảo về giáo dục giới tính và sức khỏe sinh sản cho thanh niên",
    imageUrl: "https://picsum.photos/100/100?random=124",
    timestamp: "1 ngày trước • Sự kiện",
  },
  {
    id: 25,
    title: "Chiến dịch hiến máu nhân đạo của thanh niên tình nguyện",
    imageUrl: "https://picsum.photos/100/100?random=125",
    timestamp: "1 ngày trước • Hoạt động",
  },
];