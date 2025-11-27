// mock-data.js

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
      title: "Tấm gương đạo đức Hồ Chí Minh: Bài học cho thế hệ trẻ ngày nay",
      description: "Phân tích những giá trị cốt lõi trong tư tưởng đạo đức Hồ Chí Minh và ứng dụng vào cuộc sống, học tập của thanh thiếu niên.",
      category: "Đạo Đức",
      author: "Thanh Niên Việt",
      date: "27/11/2025",
      // Sử dụng Lorem Picsum với kích thước 800x600
      imageUrl: "https://picsum.photos/800/600?random=1", 
      likes: 350,
      comments: 88,
      isHot: true,
    },
    {
      id: 2,
      title: "Xây dựng lý tưởng sống: Hành trang không thể thiếu của tuổi trẻ",
      description: "Làm thế nào để thanh niên xác định và kiên trì theo đuổi lý tưởng, góp phần vào sự phát triển của đất nước.",
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
      description: "Thanh niên là lực lượng nòng cốt trong việc tiếp thu và làm chủ công nghệ, đóng góp vào quá trình hiện đại hóa đất nước.",
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
      description: "Tổng hợp các hoạt động tình nguyện ý nghĩa và lời kêu gọi thanh niên tham gia xây dựng lối sống đẹp, trách nhiệm.",
      category: "Hoạt Động Cộng Đồng",
      author: "Mùa Hè Xanh",
      date: "22/11/2025",
      imageUrl: "https://picsum.photos/800/600?random=4",
      likes: 150,
      comments: 25,
      isHot: false,
    },
  ];
  
  // ... (phần QUOTES giữ nguyên như đã chỉnh sửa trước đó)
  export const QUOTES = [
    {
      content: "Thanh niên là người chủ tương lai của nước nhà. Thật vậy, nước nhà thịnh hay suy, yếu hay mạnh một phần lớn là do các thanh niên.",
      author: "Hồ Chí Minh",
    },
    {
      content: "Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam.",
      author: "Hồ Chí Minh",
    },
    {
      content: "Non sông Việt Nam có trở nên vẻ vang hay không, dân tộc Việt Nam có sánh vai với các cường quốc năm châu được hay không, chính là nhờ một phần lớn ở công học tập của các em.",
      author: "Hồ Chí Minh",
    },
    {
      content: "Một dân tộc dốt là một dân tộc yếu.",
      author: "Hồ Chí Minh",
    },
    {
      content: "Phải làm cho dân tộc ta trở nên một dân tộc anh dũng, một dân tộc văn minh, một dân tộc mạnh khoẻ.",
      author: "Hồ Chí Minh",
    },
    {
      content: "Tôi chỉ có một sự ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành.",
      author: "Hồ Chí Minh",
    },
    {
      content: "Đừng sợ khó, chỉ sợ lòng không bền.",
      author: "Nguyễn Trãi",
    },
  ];