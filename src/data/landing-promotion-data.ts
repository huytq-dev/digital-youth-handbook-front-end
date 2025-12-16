
import snVolunteer1 from "@/assets/promotions-images/412034513_755665786594739_668777376406512372_n-390x205.jpg";
import snVolunteer2 from "@/assets/promotions-images/130c1782506beb35b27a-392x272.jpg";
import snVolunteer3 from "@/assets/promotions-images/images1755231_hieu-392x272.jpg";
import snChong1 from "@/assets/promotions-images/6_viet-1728000710244-392x272.jpg";
import snChong2 from "@/assets/promotions-images/ct-copy-2-392x272.jpg";
import snChong3 from "@/assets/promotions-images/338545150_598961758949097_316580-1718410101106-300x208.jpg";
import snSport1 from "@/assets/promotions-images/images1743666_1-1-390x205.gif";
import snSport2 from "@/assets/promotions-images/images1731174_marathon_1_logo-392x272.jpg";
import snSport3 from "@/assets/promotions-images/images1721099_1-392x272.gif";
import snSport4 from "@/assets/promotions-images/images1719533_1-392x272.gif";

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
 * @property {string} url - Đường dẫn chi tiết bài viết
 * @property {string} timestamp - Thời gian/nhãn chuyên mục (ví dụ: "Vừa xong • Tin nóng")
 */

/**
 * @type {SidebarNewsItem[]}
 */
export const SIDEBAR_NEWS = [
  // --- TOPIC: Mạng lưới tình nguyện ---
  {
    id: 1,
    title: "Đề xuất chính sách cho thanh niên tình nguyện tại diễn đàn quốc tế",
    imageUrl: snVolunteer1,
    url: "http://thanhdoandanang.org.vn/archives/24594",
    timestamp: "Mạng lưới tình nguyện • 29/11/2024",
  },
  {
    id: 2,
    title: "Chương trình “Mỗi tháng một địa chỉ yêu thương”",
    imageUrl: snVolunteer2,
    url: "http://thanhdoandanang.org.vn/archives/24465",
    timestamp: "Mạng lưới tình nguyện • 21/11/2024",
  },
  {
    id: 3,
    title: "Những ‘ngân hàng máu nóng’ tiếp sức bệnh nhân",
    imageUrl: snVolunteer3,
    url: "http://thanhdoandanang.org.vn/archives/24312",
    timestamp: "Mạng lưới tình nguyện • 07/11/2024",
  },

  // --- TOPIC: Chống luận điệu sai trái, tự diễn biến, tự chuyển hoá ---
  {
    id: 4,
    title: "Bài cuối: Lời cảnh báo từ chính “người trong cuộc”",
    imageUrl: snChong1,
    url: "http://thanhdoandanang.org.vn/archives/24017",
    timestamp: "Chống luận điệu sai trái • 12/10/2024",
  },
  {
    id: 5,
    title: "Lật tẩy chiêu trò đả kích, bôi nhọ của các thế lực thù địch",
    imageUrl: snChong2,
    url: "http://thanhdoandanang.org.vn/archives/24023",
    timestamp: "Chống luận điệu sai trái • 22/12/2024",
  },
  {
    id: 6,
    title:
      "Minh chứng phản bác các nhận định sai lệch trong “Báo cáo tự do tôn giáo quốc tế 2024” của USCIRF",
    imageUrl: snChong3,
    url: "http://thanhdoandanang.org.vn/archives/24026",
    timestamp: "Chống luận điệu sai trái • 25/12/2024",
  },

  // --- TOPIC: Thể thao - Giải trí ---
  {
    id: 7,
    title: "Xây dựng phố đi bộ Bạch Đằng an toàn, văn minh",
    imageUrl: snSport1,
    url: "http://thanhdoandanang.org.vn/archives/23549",
    timestamp: "Thể thao - Giải trí • 23/07/2024",
  },
  {
    id: 8,
    title: "Hấp dẫn từ cuộc thi Marathon quốc tế Đà Nẵng 2024",
    imageUrl: snSport2,
    url: "http://thanhdoandanang.org.vn/archives/22808",
    timestamp: "Thể thao - Giải trí • 25/03/2024",
  },
  {
    id: 9,
    title: "Du lịch Đà Nẵng phục hồi và tiếp tục phát triển mạnh mẽ",
    imageUrl: snSport3,
    url: "http://thanhdoandanang.org.vn/archives/22135",
    timestamp: "Thể thao - Giải trí • 18/12/2023",
  },
  {
    id: 10,
    title: "Đà Nẵng khẳng định điểm đến hấp dẫn để thu hút du khách",
    imageUrl: snSport4,
    url: "http://thanhdoandanang.org.vn/archives/22068",
    timestamp: "Thể thao - Giải trí • 30/11/2023",
  },
];