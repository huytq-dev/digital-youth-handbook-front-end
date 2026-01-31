import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";
import chuyenDoiSoImageMobile from "@/assets/infographic_chu_de/chu_de_6/Chuong_6_mobile.png";
import chuyenDoiSoImageDesktop from "@/assets/infographic_chu_de/chu_de_6/Chuong_6_desktop.png";
import chuyenDoiSoGioiThieu from "@/assets/infographic_chu_de/chu_de_6/chuyen_doi_so_gioi_thieu.png";
import chuyenDoiSo2 from "@/assets/infographic_chu_de/chu_de_6/chuyen_doi_so_2.png";
import chuyenDoiSo4 from "@/assets/infographic_chu_de/chu_de_6/chuyen_doi_so_4.png";
import chuyenDoiSo41 from "@/assets/infographic_chu_de/chu_de_6/chuyen_doi_so_4.1.png";

export const chuyenDoiSoTopic: LearningTopic = {
  id: "chuyen-doi-so",
  title: "Chuyển đổi số và kĩ năng công dân số cho thanh, thiếu niên",
  objectives: [
    "Giúp đoàn viên, thanh niên nhận thức rõ vai trò, trách nhiệm của mình trong chuyển đổi số quốc gia",
    "Trang bị những hiểu biết cơ bản về chuyển đổi số và công dân số trong kỷ nguyên mới",
    "Hình thành thái độ chủ động, tích cực ứng dụng công nghệ vào học tập, lao động và hoạt động Đoàn",
    "Bồi dưỡng các kỹ năng công dân số để sử dụng Internet an toàn, hiệu quả, văn minh và có trách nhiệm",
  ],
  content: {
    summary:
      "Trong kỷ nguyên mới – Kỷ nguyên vươn mình của dân tộc, cuộc cách mạng công nghiệp 4.0 đang diễn ra mạnh mẽ trên toàn cầu, chuyển đổi số đã trở thành xu hướng tất yếu và là động lực quan trọng để phát triển đất nước về mọi mặt. Đảng và Nhà nước ta đã xác định chuyển đổi số là nhiệm vụ trọng tâm, là giải pháp then chốt để đưa Việt Nam phát triển nhanh và bền vững. Trong bối cảnh đó, đoàn viên, thanh niên có vai trò hết sức quan trọng đối với chuyển đổi số.\n\nChuyển đổi số là quá trình thay đổi tổng thể và toàn diện của các cá nhân, tổ chức về cách sống, cách làm việc và phương thức sản xuất dựa trên các công nghệ số. Đoàn viên, thanh niên là lực lượng tiên phong trong ứng dụng công nghệ và đổi mới sáng tạo, góp phần xây dựng và phát triển hạ tầng số, nâng cao nhận thức và kỹ năng cho cộng đồng trong quá trình chuyển đổi số.",
    videoUrl: "https://www.youtube.com/embed/cT4bYOnAS7U",
    sections: [
      {
        title: "Giới thiệu",
        imageUrl: chuyenDoiSoGioiThieu,
        content: `Trong kỷ nguyên mới – Kỷ nguyên vươn mình của dân tộc, cuộc cách mạng công nghiệp 4.0 đang diễn ra mạnh mẽ trên toàn cầu, chuyển đổi số đã trở thành xu hướng tất yếu và là động lực quan trọng để phát triển đất nước về mọi mặt. Đảng và Nhà nước ta đã xác định chuyển đổi số là nhiệm vụ trọng tâm, là giải pháp then chốt để đưa Việt Nam phát triển nhanh và bền vững. Trong bối cảnh đó, đoàn viên, thanh niên có vai trò hết sức quan trọng đối với chuyển đổi số.

Thủ tướng Phạm Minh Chính chủ trì đối thoại với thanh niên năm 2025 với chủ đề: "Thanh niên Việt Nam tiên phong phát triển khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia". Điều này cho thấy sự quan tâm đặc biệt của Đảng và Nhà nước đối với vai trò của thanh niên trong công cuộc chuyển đổi số quốc gia.`,
      },
      {
        title: "Chuyển đổi số và tầm quan trọng của chuyển đổi số",
        imageUrl: chuyenDoiSo2,
        content: `Có thể hiểu chuyển đổi số là quá trình thay đổi tổng thể và toàn diện của các cá nhân, tổ chức về cách sống, cách làm việc và phương thức sản xuất dựa trên các công nghệ số. Quá trình này hướng đến mục tiêu thúc đẩy phát triển kinh tế số, xã hội số; làm thay đổi phương thức quản lý nhà nước, mô hình sản xuất kinh doanh, tiêu dùng và đời sống văn hóa, xã hội.

Chuyển đổi số quốc gia bao gồm 3 cấu phần chính, lần lượt là chuyển đổi số trong hoạt động của cơ quan nhà nước nhằm phát triển chính phủ số, chuyển đổi số trong hoạt động của doanh nghiệp nhằm phát triển kinh tế số, chuyển đổi số trong hoạt động của người dân nhằm phát triển xã hội số.

Đảng và Nhà nước đã và đang đặc biệt quan tâm đến chuyển đổi số trong bối cảnh cuộc Cách mạng công nghiệp lần thứ tư. Ngày 27-9-2019, Bộ Chính trị đã ban hành Nghị quyết số 52-NQ/TW về một số chủ trương, chính sách chủ động tham gia cuộc Cách mạng công nghiệp lần thứ tư. Một trong những quan điểm chỉ đạo quan trọng của Đảng được thể hiện trong Nghị quyết là: "Chủ động, tích cực tham gia cuộc Cách mạng công nghiệp lần thứ tư là yêu cầu tất yếu khách quan; là nhiệm vụ có ý nghĩa chiến lược đặc biệt quan trọng, vừa cấp bách vừa lâu dài của cả hệ thống chính trị và toàn xã hội, gắn chặt với quá trình hội nhập quốc tế sâu rộng; đồng thời nhận thức đầy đủ, đúng đắn về nội hàm, bản chất của cuộc Cách mạng công nghiệp lần thứ tư để quyết tâm đổi mới tư duy và hành động, coi đó là giải pháp đột phá với bước đi và lộ trình phù hợp là cơ hội để Việt Nam bứt phá trong phát triển kinh tế - xã hội".

Trong các văn kiện của Đại hội XIII (Báo cáo chính trị, Chiến lược phát triển kinh tế - xã hội 10 năm 2021-2030; Báo cáo đánh giá kết quả thực hiện nhiệm vụ phát triển kinh tế - xã hội 5 năm 2016-2020 và phương hướng, nhiệm vụ phát triển kinh tế - xã hội 5 năm 2021-2025), có tới 21 lần Đảng nhấn mạnh cụm từ "chuyển đổi số". Trong Chiến lược phát triển kinh tế - xã hội 10 năm 2021-2030, Đảng nhấn mạnh: "Phát triển nhanh và bền vững dựa chủ yếu vào khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số". Phương hướng, nhiệm vụ và giải pháp phát triển kinh tế - xã hội 5 năm 2021 - 2025 cũng xác định: "Hoàn thiện thể chế để thúc đẩy quá trình chuyển đổi số". Điểm qua các văn kiện quan trọng của Đảng tại Đại hội XIII cho thấy, chuyển đổi số quốc gia là vấn đề có tính chiến lược trong đường lối phát triển đất nước, là con đường, cách thức để hiện thực hóa khát vọng phát triển Việt Nam đến năm 2045.

Ngày 22 tháng 12 năm 2024, Tổng Bí thư Tô Lâm đã ký ban hành Nghị quyết số 57-NQ/TW của Bộ Chính trị về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia. Nghị quyết chỉ rõ: "Phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số đang là yếu tố quyết định phát triển của các quốc gia; là điều kiện tiên quyết, thời cơ tốt nhất để nước ta phát triển giàu mạnh, hùng cường trong kỷ nguyên mới - kỷ nguyên vươn mình của Dân tộc".

Như vậy, Đảng đã xác định tầm quan trọng của chuyển đổi số, có đó là đột phá quan trọng là điều kiện tiên quyết, thời cơ tốt nhất để nước ta phát triển giàu mạnh, hùng cường trong kỷ nguyên mới - kỷ nguyên vươn mình của Dân tộc.`,
      },
      {
        title: "Vai trò của đoàn viên, thanh niên đối với chuyển đổi số trong kỷ nguyên mới",
        content: `Kỷ nguyên mới của dân tộc Việt Nam là thời kỳ lịch sử mới trong tiến trình phát triển của dân tộc Việt Nam mà ở đó các mục tiêu, nhiệm vụ chiến lược được thực hiện, hoàn thành, tạo ra bước ngoặt trong tiến trình phát triển của dân tộc, đất nước ta. Đó là kỷ nguyên dưới sự lãnh đạo của Đảng, xây dựng thành công nước Việt Nam dân giàu, nước mạnh, dân chủ, công bằng, văn minh, phấn đấu đến năm 2030 là nước đang phát triển, có công nghiệp hiện đại, thu nhập trung bình cao; đến năm 2045 trở thành nước phát triển, thu nhập cao vững bước đi lên chủ nghĩa xã hội, "sánh vai với các cường quốc năm châu".

Trong kỷ nguyên mới, đoàn viên, thanh niên có vai trò hết sức quan trọng đối với chuyển đổi số, được thể hiện ở những nội dung cơ bản sau:

Một là, đoàn viên, thanh niên là lực lượng tiên phong trong ứng dụng công nghệ và đổi mới sáng tạo. Có thể thấy, đoàn viên thanh niên là nhóm đối tượng nhanh nhạy trong việc tiếp cận và ứng dụng công nghệ mới. Với khả năng học hỏi nhanh, thanh niên có thể nghiên cứu, phát triển và áp dụng các giải pháp công nghệ vào thực tiễn công việc, học tập cũng như cuộc sống hàng ngày. Nhiều sáng kiến, phần mềm, ứng dụng hữu ích được các đoàn viên sáng tạo đã góp phần không nhỏ vào quá trình chuyển đổi số tại địa phương, cơ quan và doanh nghiệp.

Hai là, đoàn viên, thanh niên là lực lượng xung kích tham gia xây dựng và phát triển hạ tầng số. Thanh niên là lực lượng quan trọng trong việc xây dựng, vận hành các nền tảng số, hệ thống dữ liệu lớn (big data) và các phần mềm ứng dụng phục vụ chính phủ điện tử, đô thị thông minh và xã hội số. Đoàn viên, thanh niên có thể tham gia trực tiếp vào các dự án phát triển nền tảng công nghệ, góp phần đảm bảo an ninh mạng và phát triển hạ tầng số của quốc gia.

Ba là, đoàn viên, thanh niên là lực lượng góp phần nâng cao nhận thức và kỹ năng cho cộng đồng trong quá trình chuyển đổi số. Đoàn viên, thanh niên không chỉ là người sử dụng công nghệ mà còn là những "người truyền lửa", giúp nâng cao nhận thức về chuyển đổi số cho cộng đồng. Thông qua các hoạt động tình nguyện, đoàn viên có thể hướng dẫn người dân, đặc biệt là ở vùng sâu, vùng xa tiếp cận và sử dụng các dịch vụ công trực tuyến, thanh toán không dùng tiền mặt, ứng dụng thương mại điện tử…

Bốn là, đoàn viên, thanh niên là lực lượng quan trọng cho khởi nghiệp và phát triển kinh tế số. Đoàn viên thanh niên là lực lượng giàu tinh thần khởi nghiệp và sáng tạo. Nhiều mô hình kinh tế số, thương mại điện tử, và các dự án khởi nghiệp công nghệ đã được các bạn trẻ triển khai thành công, góp phần tạo việc làm và thúc đẩy sự phát triển kinh tế địa phương.

Năm là, đoàn viên, thanh niên là lực lượng đóng góp vào cải cách hành chính và xây dựng chính phủ điện tử. Trong các cơ quan, đoàn viên, thanh niên là lực lượng tiên phong đề xuất và thực hiện các giải pháp số hóa quy trình làm việc, sử dụng phần mềm quản lý dữ liệu, ứng dụng công nghệ trong quản lý và vận hành. Qua đó, góp phần đẩy nhanh quá trình cải cách hành chính, xây dựng nền hành chính hiện đại, minh bạch và hiệu quả.`,
      },
      {
        title: "Một số giải pháp phát huy vai trò của thanh niên trong chuyển đổi số công tác Đoàn hiện nay",
        content: `Nhận thức rõ tầm quan trọng và trách nhiệm lớn lao của lực lượng thanh niên đối với công cuộc chuyển đổi số, thời gian tới, mỗi đoàn viên thanh niên cần thực hiện một số giải pháp đẩy mạnh chuyển đổi số trong tất cả các mặt hoạt động của Đoàn như sau:

Một là, không ngừng học tập, nghiên cứu, tìm hiểu và nâng cao nhận thức về chuyển đổi số; bồi dưỡng và tự trau dồi, nắm vững được những kiến thức cơ bản về chuyển đổi số, các giải pháp chuyển đổi số hiện đang được định hướng triển khai rộng khắp trong hệ thống tổ chức của Đoàn ở các cấp. Tích cực tham gia các hội thảo, hội nghị cho cán bộ, đoàn viên, thanh niên, người lao động tại đơn vị để tuyên truyền, truyền thông về chuyển đổi số. Bên cạnh việc không ngừng học tập, rèn luyện nâng cao trình độ chuyên môn nghiệp vụ, cần thường xuyên trau dồi hiểu biết về tình hình thế giới để có tư duy, hành động phù hợp hơn, góp phần thúc đẩy nhanh và nâng cao hiệu quả chuyển đổi số tại địa phương đơn vị.

Hai là, cần chủ động tham mưu, góp ý cho lãnh đạo tại địa phương, đơn vị mình để đưa ra các giải pháp giúp thúc đẩy công tác chuyển đổi số. Vận dụng vốn kiến thức và năng lực bản thân, không ngừng phát huy tính sáng tạo và phát triển các giải pháp, ý tưởng nâng cao hiệu quả chuyển đổi số tại cơ quan, đơn vị, qua đó, cụ thể hóa chủ trương, nghị quyết, kế hoạch, triển khai các phương án chuyển đổi số khả thi trên tất cả các lĩnh vực trong thời gian sớm nhất. Tăng cường áp dụng khoa học – công nghệ, chuyển đổi số trong tổ chức các hoạt động phong trào trên toàn hệ thống của Đoàn, từng bước nâng cao hiệu quả công việc.

Ba là, tích cực tham gia tổ chức triển khai các nhiệm vụ phong trào, chương trình chuyển đổi số do Đoàn cấp trên phát động; truyền thông, lan tỏa đến đông đảo cán bộ, đoàn viên, thanh niên và mọi người xung quanh. Chủ động tham gia các tổ chuyển đổi số, nhóm chuyển đổi số tại địa phương, đơn vị để luôn nắm bắt được nhanh chóng tình hình chuyển đổi số trên tất cả các lĩnh vực. Cũng như luôn thể hiện được vai trò, tính xung kích, tình nguyện sức trẻ và năng lượng đổi mới trong mọi nhiệm vụ được giao, nhanh chóng và kịp thời trong công tác thực thi chuyển đổi số tại, địa phương, đơn vị đang công tác.

Bốn là, nâng cao năng lực hợp tác, liên kết giữa các cơ quan, đơn vị để giúp nâng cao hiệu quả chuyển đổi số. Các cơ quan đơn vị hoạt động trong lĩnh vực Công nghệ thông tin, cả doanh nghiệp và cơ quan chính quyền có vai trò quan trọng đối với công tác chuyển đổi số. Việc gắn kết, phối hợp sẽ giúp cho các hoạt động của tổ chức Đoàn có nhiều hơn các giải pháp, và thực hiện các giải pháp một cách đồng bộ, nhanh chóng và hiệu quả hơn.

Thanh niên Việt Nam có đầy đủ tiềm năng và năng lực để trở thành lực lượng tiên phong trong quá trình chuyển đổi số của đất nước, từ đó nắm bắt cơ hội này để phát triển bản thân, tạo dựng một tương lai tươi sáng cho chính mình và đóng góp vào sự phát triển của đất nước. Phát huy tinh thần dám nghĩ, dám làm của tuổi trẻ, cán bộ, đoàn viên thanh niên cần chủ động tham mưu, góp ý với cấp ủy, người đứng đầu cơ quan, đơn vị, địa phương về các giải pháp giúp thúc đẩy công tác chuyển đổi số trong mọi lĩnh vực hoạt động. Đồng thời, cán bộ, đoàn viên thanh niên cần tích cực tuyên truyền, vận động người dân áp dụng công nghệ số vào cuộc sống, qua đó góp phần nâng cao hiệu quả triển khai các hoạt động chuyển đổi số ở cơ quan, đơn vị, địa phương, đúng với tinh thần đi đầu của thanh niên.`,
      },
      {
        title: "Phát triển kĩ năng công dân số cho thế hệ trẻ",
        imageUrl: chuyenDoiSo4,
        subSections: [
          {
            title: "Công dân số là gì?",
            imageUrl: chuyenDoiSo41,
            content: `Trong bối cảnh công nghệ thông tin phát triển mạnh mẽ trên toàn thế giới, chuyển đổi số được sử dụng tối ưu ở tất cả các lĩnh vực trong đó có giáo dục và đào tạo. Điều này đỏi hỏi cấp thiết về việc trang bị cho các em những kiến thức và kỹ năng cần thiết để sử dụng công nghệ một cách hiệu quả, an toàn.

Công dân số (Digital Citizen) là những cá nhân sử dụng công nghệ số một cách có trách nhiệm, an toàn và hiệu quả trong học tập, làm việc, giao tiếp và tham gia vào các hoạt động trực tuyến. Một công dân số không chỉ biết cách sử dụng Internet, mạng xã hội hay các thiết bị thông minh mà còn có trách nhiệm trong việc bảo vệ dữ liệu cá nhân, tuân thủ đạo đức số và hiểu rõ quyền lợi cũng như nghĩa vụ của mình trên không gian mạng.`,
          },
          {
            title: "Đặc điểm của công dân số",
            content: `- Hiểu biết về công nghệ: Biết cách sử dụng Internet, phần mềm và công cụ số.

- Tư duy phản biện: Đánh giá thông tin trực tuyến một cách khách quan và tránh tin giả.

- Bảo vệ thông tin cá nhân: Có ý thức về bảo mật và quyền riêng tư trên mạng.

- Giao tiếp số có trách nhiệm: Biết cách ứng xử lịch sự và có đạo đức khi tương tác trực tuyến.

- Sử dụng Internet một cách lành mạnh: Không bị nghiện công nghệ, biết quản lý thời gian và sử dụng mạng một cách hiệu quả.`,
          },
          {
            title: "Tại sao giáo dục công dân số quan trọng?",
            content: `- Thế giới đang số hóa nhanh chóng: Hầu hết các hoạt động từ học tập, làm việc đến giải trí đều chuyển dịch sang môi trường số.

- Nhiều rủi ro trên Internet: Tin giả, lừa đảo trực tuyến, mất an toàn thông tin cá nhân là những vấn đề đáng lo ngại.

- Giao tiếp và tương tác toàn cầu: Công dân số cần biết cách làm việc và hợp tác với những người từ nhiều nền văn hóa khác nhau.

- Hỗ trợ phát triển cá nhân và nghề nghiệp: Biết cách sử dụng công nghệ một cách hiệu quả giúp nâng cao cơ hội học tập và làm việc trong tương lai.`,
          },
          {
            title: "Các nguyên tắc của giáo dục công dân số",
            content: `- Nhận thức về an toàn mạng: Biết cách bảo vệ bản thân trước những nguy cơ trên Internet.

- Tôn trọng quyền riêng tư và thông tin cá nhân: Không chia sẻ dữ liệu nhạy cảm mà không có sự đồng ý.

- Ứng xử văn minh trên không gian mạng: Không bắt nạt trực tuyến, không phát tán nội dung độc hại.

- Hiểu về quyền và trách nhiệm của công dân số: Tôn trọng luật pháp, tránh vi phạm bản quyền và gian lận trực tuyến.`,
          },
          {
            title: "Các kỹ năng công dân số cần trang bị trong xã hội hiện đại",
            content: `Trong thời đại số, việc trở thành một công dân số có trách nhiệm đòi hỏi mỗi cá nhân phải có những kỹ năng quan trọng để sử dụng công nghệ một cách an toàn, hiệu quả và có đạo đức. Dưới đây là phân tích chi tiết về các kỹ năng công dân số mà mỗi người cần trang bị:

**Kỹ năng sử dụng công nghệ và thiết bị số**

Công nghệ hiện nay có mặt ở khắp mọi lĩnh vực, từ giáo dục, y tế, kinh tế cho đến giải trí. Một công dân số cần biết cách sử dụng các thiết bị công nghệ để phục vụ cho việc học tập, làm việc và giao tiếp hiệu quả.

Những yêu cầu cơ bản của kỹ năng này:
- Thành thạo các thiết bị số: Biết cách sử dụng máy tính, điện thoại thông minh, máy tính bảng và các thiết bị hỗ trợ khác.
- Làm quen với các nền tảng số: Biết sử dụng email, Google Drive, Zoom, Microsoft Teams để làm việc trực tuyến.
- Ứng dụng công nghệ vào học tập và công việc: Biết cách sử dụng công cụ như Microsoft Office (Word, Excel, PowerPoint), Google Docs để tối ưu hóa năng suất làm việc.
- Làm quen với trí tuệ nhân tạo (AI) và tự động hóa: Ứng dụng AI trong công việc như sử dụng chatbot, công cụ dịch thuật hoặc phần mềm nhận diện giọng nói.

**Kỹ năng an toàn và bảo mật thông tin số**

Môi trường Internet có nhiều rủi ro như tấn công mạng, lừa đảo trực tuyến và đánh cắp thông tin cá nhân. Công dân số cần có kiến thức và kỹ năng để bảo vệ bản thân trước các nguy cơ này.

Những yêu cầu cơ bản của kỹ năng này:
- Bảo vệ tài khoản cá nhân: Sử dụng mật khẩu mạnh, đổi mật khẩu thường xuyên, kích hoạt xác thực hai lớp để ngăn chặn truy cập trái phép.
- Nhận diện lừa đảo trực tuyến: Không nhấp vào các liên kết lạ, không cung cấp thông tin cá nhân cho các trang web không đáng tin cậy.
- Kiểm soát quyền riêng tư: Hiểu rõ các cài đặt bảo mật trên mạng xã hội như Facebook, TikTok, Instagram để giới hạn ai có thể xem thông tin cá nhân của mình.
- Bảo vệ dữ liệu quan trọng: Biết cách sao lưu dữ liệu quan trọng lên nền tảng đám mây như Google Drive hoặc OneDrive.

**Kỹ năng tìm kiếm và đánh giá thông tin trên Internet**

Trong thế giới số, có hàng triệu thông tin được đăng tải mỗi ngày, nhưng không phải thông tin nào cũng chính xác. Một công dân số cần biết cách tìm kiếm thông tin đáng tin cậy và tránh bị ảnh hưởng bởi tin giả.

Những yêu cầu cơ bản của kỹ năng này:
- Sử dụng công cụ tìm kiếm hiệu quả: Biết cách dùng Google, Bing hoặc DuckDuckGo với các từ khóa phù hợp để tìm kiếm thông tin chính xác.
- Phân biệt tin giả và tin thật: Kiểm tra nguồn tin, xác minh bằng nhiều nguồn khác nhau trước khi chia sẻ thông tin.
- Nhận diện nội dung giật gân, sai lệch: Tránh những trang web có nội dung không rõ nguồn gốc hoặc giật tít câu view.

**Kỹ năng giao tiếp và ứng xử trên không gian số**

Giao tiếp trên mạng khác với giao tiếp trực tiếp. Công dân số cần có kỹ năng giao tiếp trực tuyến một cách lịch sự, tôn trọng và hiệu quả.

Những yêu cầu cơ bản của kỹ năng này:
- Sử dụng ngôn ngữ lịch sự khi bình luận và trao đổi trên mạng xã hội.
- Không tham gia vào các cuộc tranh cãi vô bổ hoặc bắt nạt trực tuyến.
- Biết cách làm việc nhóm trực tuyến: Sử dụng các nền tảng như Google Docs, Trello, Slack để hợp tác với đồng nghiệp hoặc bạn học.

**Kỹ năng quản lý thời gian và cân bằng cuộc sống số**

Việc lạm dụng công nghệ có thể dẫn đến nghiện Internet, ảnh hưởng đến sức khỏe tinh thần và thể chất. Biết cách quản lý thời gian sử dụng công nghệ giúp mỗi người đạt hiệu quả cao hơn trong công việc và cuộc sống.

Những yêu cầu cơ bản của kỹ năng này:
- Giới hạn thời gian sử dụng mạng xã hội: Không để bản thân bị cuốn vào việc lướt Facebook, TikTok quá lâu.
- Lập kế hoạch thời gian hợp lý: Phân chia thời gian giữa làm việc, giải trí và vận động thể chất.
- Tham gia các hoạt động ngoài trời: Không để công nghệ chiếm toàn bộ cuộc sống mà vẫn duy trì các hoạt động thực tế.

**Kỹ năng tôn trọng bản quyền và sử dụng nội dung số đúng luật**

Trên Internet, nội dung như hình ảnh, video, tài liệu đều có chủ sở hữu. Công dân số cần biết tôn trọng bản quyền và tránh vi phạm pháp luật.

Những yêu cầu cơ bản của kỹ năng này:
- Không sử dụng tài liệu mà không có sự cho phép của tác giả.
- Luôn ghi nguồn khi sử dụng nội dung của người khác.
- Hiểu luật về bản quyền số để tránh bị phạt hoặc bị xóa nội dung.

Việc trang bị các kỹ năng công dân số là vô cùng cần thiết trong xã hội hiện đại. Khi có đầy đủ những kỹ năng này, mỗi cá nhân không chỉ bảo vệ bản thân khỏi những rủi ro trực tuyến mà còn có thể tận dụng công nghệ để phát triển sự nghiệp và cuộc sống một cách hiệu quả. Một công dân số có trách nhiệm là người sử dụng Internet một cách thông minh, an toàn và có đạo đức!`,
          },
        ],
      },
    ],
  },
  infographicUrl: "/images/learning-topics/chuyen-doi-so.jpg",
  infographicUrls: [
    chuyenDoiSoImageMobile,
    chuyenDoiSoImageDesktop,
  ],
  quiz: [
    {
      id: 1,
      question: "Chuyển đổi số được hiểu đúng nhất là:",
      options: [
        "Thay thế con người bằng máy móc",
        "Sử dụng máy tính trong công việc",
        "Thay đổi toàn diện cách sống, làm việc, sản xuất dựa trên công nghệ số",
        "Đưa Internet đến mọi nơi",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 2,
      question: "Chuyển đổi số quốc gia gồm mấy cấu phần chính?",
      options: ["2", "3", "4", "5"],
      correctAnswerIndex: 1,
    },
    {
      id: 3,
      question: "Ba cấu phần của chuyển đổi số quốc gia là:",
      options: [
        "Chính phủ số – Công nghiệp số – Giáo dục số",
        "Nhà nước số – Kinh tế số – Công nghệ số",
        "Chính phủ số – Kinh tế số – Xã hội số",
        "Cơ quan số – Doanh nghiệp số – Trường học số",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 4,
      question: "Theo các Nghị quyết của Đảng, chuyển đổi số có vai trò như thế nào?",
      options: [
        "Là nhiệm vụ riêng của ngành CNTT",
        "Là nhiệm vụ ngắn hạn của thanh niên",
        "Là nhiệm vụ chiến lược, điều kiện tiên quyết để phát triển đất nước",
        "Chỉ áp dụng ở thành phố lớn",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 5,
      question: "Vai trò nổi bật nhất của đoàn viên, thanh niên trong chuyển đổi số là:",
      options: [
        "Người quản lý hệ thống",
        "Lực lượng tiên phong, xung kích",
        "Người thụ hưởng thụ động",
        "Người giám sát",
      ],
      correctAnswerIndex: 1,
    },
    {
      id: 6,
      question: "Một nhóm đoàn viên lập ứng dụng giúp người dân nộp hồ sơ trực tuyến nhanh hơn. Vai trò này thể hiện rõ nhất đặc điểm nào của thanh niên?",
      options: [
        "Lực lượng tiêu dùng công nghệ",
        "Lực lượng bảo vệ môi trường",
        "Lực lượng tiên phong đổi mới sáng tạo",
        "Lực lượng tuyên truyền văn hóa",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 7,
      question: "Hành động nào sau đây góp phần xây dựng xã hội số?",
      options: [
        "Chỉ dùng tiền mặt khi mua hàng",
        "Tránh sử dụng dịch vụ công trực tuyến",
        "Hướng dẫn người dân thanh toán không tiền mặt",
        "Không tham gia mạng xã hội",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 8,
      question: '"Công dân số" là người:',
      options: [
        "Sử dụng Internet thường xuyên",
        "Có nhiều tài khoản mạng xã hội",
        "Sử dụng công nghệ an toàn, hiệu quả, có trách nhiệm",
        "Biết lập trình máy tính",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 9,
      question: "Kỹ năng quan trọng giúp tránh tin giả là:",
      options: [
        "Giao tiếp trực tuyến",
        "Tư duy phản biện và đánh giá nguồn tin",
        "Sử dụng mạng xã hội thường xuyên",
        "Ghi nhớ thông tin nhanh",
      ],
      correctAnswerIndex: 1,
    },
    {
      id: 10,
      question: "Khi nhận được tin nhắn trúng thưởng yêu cầu cung cấp mã OTP, em nên:",
      options: [
        "Cung cấp ngay để nhận quà",
        "Hỏi bạn bè rồi cung cấp",
        "Bỏ qua và báo cho người lớn",
        "Chia sẻ lên mạng xã hội",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 11,
      question: "Việc đặt mật khẩu mạnh và xác thực hai lớp giúp:",
      options: [
        "Tăng tốc độ truy cập mạng",
        "Trang trí tài khoản đẹp hơn",
        "Bảo vệ tài khoản khỏi bị xâm nhập",
        "Thu hút nhiều người theo dõi",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 12,
      question: "Hành vi nào thể hiện ứng xử văn minh trên không gian mạng?",
      options: [
        "Bình luận xúc phạm khi không đồng ý",
        "Chia sẻ thông tin chưa kiểm chứng",
        "Góp ý lịch sự, tôn trọng người khác",
        "Tham gia tranh cãi gay gắt",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 13,
      question: "Một học sinh dùng nhạc có bản quyền đăng video mà không xin phép. Hành vi này vi phạm:",
      options: [
        "Quy tắc giao tiếp",
        "Quyền riêng tư",
        "Bản quyền số",
        "An toàn mạng",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 14,
      question: "Để tránh nghiện mạng xã hội, học sinh nên:",
      options: [
        "Sử dụng điện thoại mọi lúc rảnh",
        "Đặt giới hạn thời gian sử dụng",
        "Không tham gia hoạt động ngoài trời",
        "Chỉ học trực tuyến",
      ],
      correctAnswerIndex: 1,
    },
    {
      id: 15,
      question: "Một đoàn viên hướng dẫn người dân tạo tài khoản dịch vụ công trực tuyến. Việc làm này thể hiện:",
      options: [
        "Vai trò quản lý hành chính",
        "Vai trò truyền cảm hứng và lan tỏa chuyển đổi số",
        "Vai trò giám sát xã hội",
        "Vai trò kinh doanh",
      ],
      correctAnswerIndex: 1,
    },
  ],
  references: [
    {
      id: 1,
      text: "Nguồn: Internet",
    },
  ],
};
