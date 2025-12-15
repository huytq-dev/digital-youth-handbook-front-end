// Danh sách toàn bộ trường học tại Đà Nẵng (THPT, THCS, Tiểu học)
export const SCHOOLS_LIST = [
  // =================================================================
  // 1. TRƯỜNG TRUNG HỌC PHỔ THÔNG (THPT) - ĐÀ NẴNG
  // =================================================================
  
  // --- Công Lập (Top & Đại trà) ---
  "THPT Chuyên Lê Quý Đôn (Đà Nẵng)",
  "THPT Phan Châu Trinh",
  "THPT Hoàng Hoa Thám",
  "THPT Trần Phú (Đà Nẵng)",
  "THPT Thái Phiên",
  "THPT Hòa Vang",
  "THPT Nguyễn Trãi",
  "THPT Nguyễn Thượng Hiền",
  "THPT Nguyễn Hiền",
  "THPT Ngũ Hành Sơn",
  "THPT Thanh Khê",
  "THPT Cẩm Lệ",
  "THPT Liên Chiểu",
  "THPT Sơn Trà",
  "THPT Võ Chí Công",
  "THPT Nguyễn Văn Thoại",
  
  // --- Huyện Hòa Vang ---
  "THPT Ông Ích Khiêm",
  "THPT Phạm Phú Thứ",
  "THPT Phan Thành Tài",
  
  // --- Tư Thục & Quốc Tế ---
  "THPT FPT Đà Nẵng",
  "THPT Sky-Line (Hệ thống giáo dục Sky-Line)",
  "THPT Hermann Gmeiner",
  "THPT Khai Trí",
  "THPT Hiển Nhân",
  "THPT Quang Trung (Tư thục)",
  "Trường Quốc tế Singapore (SIS) Đà Nẵng",
  "Trường Quốc tế Hoa Kỳ APU",
  "Trường St. Nicholas",

  // --- Trung tâm GDTX (Giáo dục thường xuyên) ---
  "Trung tâm GDTX Số 1 Đà Nẵng",
  "Trung tâm GDTX Số 2 Đà Nẵng",
  "Trung tâm GDTX Số 3 Đà Nẵng",

  // =================================================================
  // 2. TRƯỜNG TRUNG HỌC CƠ SỞ (THCS) - ĐÀ NẴNG
  // =================================================================

  // --- Quận Hải Châu ---
  "THCS Trưng Vương",
  "THCS Kim Đồng",
  "THCS Tây Sơn",
  "THCS Sào Nam",
  "THCS Lê Hồng Phong",
  "THCS Lý Thường Kiệt",
  "THCS Nguyễn Huệ",
  "THCS Trần Hưng Đạo",
  "THCS Hồ Nghinh",
  "THCS Dương Minh Quan",

  // --- Quận Thanh Khê ---
  "THCS Nguyễn Khuyến", // (Trường điểm cấp 2)
  "THCS Huỳnh Thúc Kháng",
  "THCS Phan Đình Phùng",
  "THCS Lê Thị Hồng Gấm",
  "THCS Chu Văn An",
  "THCS Nguyễn Trãi (Thanh Khê)",
  "THCS Nguyễn Thị Minh Khai",
  "THCS Hoàng Diệu",
  "THCS Đỗ Đăng Tuyển",
  "THCS Nguyễn Đình Chiểu",

  // --- Quận Sơn Trà ---
  "THCS Lê Độ",
  "THCS Nguyễn Văn Cừ",
  "THCS Phạm Ngọc Thạch",
  "THCS Lý Tự Trọng",
  "THCS Cao Thắng",
  "THCS Nguyễn Chí Thanh",
  "THCS Hoàng Sa",
  "THCS Nguyễn Phan Vinh",

  // --- Quận Liên Chiểu ---
  "THCS Lương Thế Vinh", // (Trường điểm khu vực)
  "THCS Nguyễn Lương Bằng",
  "THCS Đàm Quang Trung",
  "THCS Lê Anh Xuân",
  "THCS Ngô Thì Nhậm",
  "THCS Nguyễn Bỉnh Khiêm",
  "THCS Nguyễn Chơn",

  // --- Quận Ngũ Hành Sơn ---
  "THCS Lê Lợi",
  "THCS Huỳnh Bá Chánh",
  "THCS Nguyễn Bỉnh Khiêm (Ngũ Hành Sơn)",
  "THCS Trần Đại Nghĩa",
  "THCS Nguyễn Hoa",

  // --- Quận Cẩm Lệ ---
  "THCS Nguyễn Văn Linh",
  "THCS Nguyễn Thiện Thuật",
  "THCS Đặng Thai Mai",
  "THCS Trần Quý Cáp",
  "THCS Nguyễn Phú Hường",

  // --- Huyện Hòa Vang ---
  "THCS Nguyễn Hồng Ánh",
  "THCS Đỗ Thúc Tịnh",
  "THCS Trần Quốc Tuấn",
  "THCS Nguyễn Văn Huyên",
  "THCS Ông Ích Đường",
  "THCS Phạm Văn Đồng",
  "THCS Trần Quang Khải",

  // =================================================================
  // 3. TRƯỜNG TIỂU HỌC - ĐÀ NẴNG
  // =================================================================

  // --- Quận Hải Châu ---
  "Trường Tiểu học Phù Đổng",
  "Trường Tiểu học Phan Thanh",
  "Trường Tiểu học Hoàng Văn Thụ",
  "Trường Tiểu học Trần Hưng Đạo",
  "Trường Tiểu học Trần Văn Ơn",
  "Trường Tiểu học Lý Công Uẩn",
  "Trường Tiểu học Lê Lai",
  "Trường Tiểu học Lê Quý Đôn",
  "Tiểu học Võ Thị Sáu",
  "Trường Tiểu học Bạch Đằng",

  // --- Quận Thanh Khê ---
  "Trường Tiểu học Huỳnh Ngọc Huệ",
  "Trường Tiểu học Trần Cao Vân",
  "Trường Tiểu học Điện Biên Phủ",
  "Trường Tiểu học Lê Văn Tám",
  "Trường Tiểu học Bế Văn Đàn",
  "Trường Tiểu học Nguyễn Bá Ngọc",
  "Trường Tiểu học Nguyễn Trung Trực",
  "Trường Tiểu học Đinh Bộ Lĩnh",
  "Trường Tiểu học Hà Huy Tập",
  "Trường Tiểu học Đoàn Thị Điểm",

  // --- Quận Sơn Trà ---
  "Trường Tiểu học Lương Thế Vinh",
  "Trường Tiểu học Trần Quốc Toản",
  "Trường Tiểu học Tiểu La",
  "Trường Tiểu học Nguyễn Tri Phương",
  "Trường Tiểu học Ngô Gia Tự",
  "Trường Tiểu học Tô Vĩnh Diện",
  "Tiểu học Nguyễn Thái Học",
  "Trường Tiểu học Lê Quý Đôn (Sơn Trà)",

  // --- Quận Liên Chiểu ---
  "Trường Tiểu học Ngô Sĩ Liên",
  "Trường Tiểu học Nguyễn Văn Trỗi",
  "Trường Tiểu học Trưng Nữ Vương",
  "Trường Tiểu học Hải Vân",
  "Trường Tiểu học Hồng Quang",
  "Trường Tiểu học Duy Tân",
  "Trường Tiểu học Âu Cơ",
  "Trường Tiểu học Võ Thị Sáu (Liên Chiểu)",

  // --- Quận Ngũ Hành Sơn ---
  "Trường Tiểu học Lê Văn Hiến",
  "Trường Tiểu học Trần Quang Diệu",
  "Trường Tiểu học Mai Đăng Chơn",
  "Trường Tiểu học Phạm Hồng Thái",
  "Trường Tiểu học Nguyễn Duy Trinh",

  // --- Quận Cẩm Lệ ---
  "Trường Tiểu học Tôn Đức Thắng",
  "Trường Tiểu học Trần Nhân Tông",
  "Trường Tiểu học Ngô Quyền",
  "Trường Tiểu học Thái Thị Bôi",
  "Trường Tiểu học Trần Đại Nghĩa",

  // --- Huyện Hòa Vang ---
  "Trường Tiểu học Hòa Phước",
  "Trường Tiểu học Hòa Khương",
  "Trường Tiểu học Hòa Phong",
  "Trường Tiểu học Hòa Châu",
  "Trường Tiểu học Hòa Tiến",
  "Trường Tiểu học Số 1 Hòa Sơn",
  "Trường Tiểu học Số 2 Hòa Sơn",
  "Trường Tiểu học Lâm Quang Thự",

  // --- Khác (Đại học lớn tại Đà Nẵng để user chọn nếu là sinh viên) ---
  "Đại học Bách khoa - ĐH Đà Nẵng",
  "Đại học Kinh tế - ĐH Đà Nẵng",
  "Đại học Sư phạm - ĐH Đà Nẵng",
  "Đại học Ngoại ngữ - ĐH Đà Nẵng",
  "Đại học Sư phạm Kỹ thuật - ĐH Đà Nẵng",
  "Đại học Công nghệ Thông tin & TT Việt Hàn (VKU)",
  "Đại học Duy Tân",
  "Đại học Đông Á",
  "Đại học Kiến trúc Đà Nẵng",
  "Đại học FPT Đà Nẵng",
] as const;

export type SchoolName = typeof SCHOOLS_LIST[number];