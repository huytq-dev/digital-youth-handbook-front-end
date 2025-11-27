
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