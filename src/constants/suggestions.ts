const requestAddServiceSuggestions = [
    // Xét nghiệm
    "Công thức máu",
    "Sinh hóa máu",
    "Định lượng đường huyết",
    "Chức năng gan (AST, ALT, GGT)",
    "Chức năng thận (Ure, Creatinine)",
    "Mỡ máu (Cholesterol, Triglyceride, HDL, LDL)",
    "HbA1c",
    "CRP định lượng",
    "Xét nghiệm đông máu",
    "Tầm soát viêm gan B, C",
    "TSH, FT4",

    // Nước tiểu
    "Tổng phân tích nước tiểu",
    "Cấy nước tiểu",
    "Test thai hCG",

    // Chẩn đoán hình ảnh
    "X-quang ngực thẳng",
    "X-quang bụng không chuẩn bị",
    "Siêu âm bụng tổng quát",
    "Siêu âm tim",
    "CT não không cản quang",
    "CT ngực – bụng – chậu",
    "MRI não",
    "MRI cột sống thắt lưng",
    "Điện tâm đồ",
    "Đo loãng xương DEXA",
];

const requestSpecialistAppointmentSuggestions = [
        // Nội tổng quát
        "Khám nội tổng quát đánh giá toàn thân",
        "Khám nội tổng quát do mệt mỏi kéo dài",
        "Khám nội tổng quát do sụt cân không rõ nguyên nhân",
        "Khám nội tổng quát do sốt kéo dài",
        "Khám nội đánh giá bệnh lý chuyển hoá",

        // Tim mạch
        "Khám tim mạch do đau ngực",
        "Khám tim mạch do khó thở khi gắng sức",
        "Khám tim mạch do hồi hộp, đánh trống ngực",
        "Khám tim mạch do tăng huyết áp",
        "Khám tim mạch đánh giá rối loạn nhịp",
        "Khám tim mạch do phù chân",

        // Hô hấp
        "Khám hô hấp do ho kéo dài",
        "Khám hô hấp do khó thở",
        "Khám hô hấp do khò khè tái diễn",
        "Khám hô hấp do nghi ngờ viêm phổi",
        "Khám hô hấp đánh giá hen phế quản",

        // Tiêu hoá
        "Khám tiêu hoá do đau bụng thượng vị",
        "Khám tiêu hoá do tiêu chảy kéo dài",
        "Khám tiêu hoá do táo bón mạn",
        "Khám tiêu hoá do đầy hơi khó tiêu",
        "Khám tiêu hoá đánh giá trào ngược dạ dày",

        // Cơ xương khớp
        "Khám cơ xương khớp do đau vai gáy",
        "Khám cơ xương khớp do đau lưng",
        "Khám cơ xương khớp do đau gối khi vận động",
        "Khám cơ xương khớp do tê buồn chân tay",
        "Khám cơ xương khớp đánh giá thoái hoá khớp",

        // Thần kinh
        "Khám thần kinh do đau đầu kéo dài",
        "Khám thần kinh do chóng mặt",
        "Khám thần kinh do yếu liệt nửa người",
        "Khám thần kinh do co giật",
        "Khám thần kinh đánh giá bệnh lý dây thần kinh ngoại biên",

        // Tai – Mũi – Họng
        "Khám tai mũi họng do viêm họng tái diễn",
        "Khám tai mũi họng do nghẹt mũi kéo dài",
        "Khám tai mũi họng do ù tai",
        "Khám tai mũi họng do viêm xoang nghi ngờ",
        "Khám tai mũi họng do giảm thính lực",

        // Mắt
        "Khám mắt do mờ mắt",
        "Khám mắt do đau nhức hốc mắt",
        "Khám mắt do dị vật mắt",
        "Khám mắt đánh giá tật khúc xạ",

        // Da liễu
        "Khám da liễu do phát ban",
        "Khám da liễu do ngứa kéo dài",
        "Khám da liễu do mụn trứng cá",
        "Khám da liễu do tổn thương da nghi ngờ nhiễm trùng",

        // Nội tiết
        "Khám nội tiết do tăng cân không rõ nguyên nhân",
        "Khám nội tiết đánh giá đái tháo đường",
        "Khám nội tiết do nghi suy giáp",
        "Khám nội tiết đánh giá rối loạn hormon",

        // Phụ khoa
        "Khám phụ khoa do khí hư bất thường",
        "Khám phụ khoa do rối loạn kinh nguyệt",
        "Khám phụ khoa đánh giá viêm nhiễm",
        "Khám phụ khoa trước thai kỳ",

        // Tiết niệu
        "Khám tiết niệu do tiểu buốt",
        "Khám tiết niệu do tiểu máu",
        "Khám tiết niệu do đau hông lưng",
        "Khám tiết niệu đánh giá sỏi thận",
    ];

const generalConsultationSuggestions = [
    "Bệnh nhân tỉnh, tiếp xúc tốt, sinh hiệu ổn định",
    "Bệnh nhân mệt mỏi, da niêm nhợt",
    "Sinh hiệu trong giới hạn bình thường",
    "Bệnh nhân có sốt nhẹ, dấu hiệu mất nước",
    "Tình trạng dinh dưỡng trung bình/gầy/béo",
    "Nhịp tim đều, tần số 75 lần/phút",
    "Nhịp tim nhanh, đều",
    "Nhịp tim chậm, đều",
    "Nghe tim không tiếng thổi",
    "Nghe tim có tiếng thổi độ I/II",
    "Hô hấp đều, không khó thở",
    "Thở nhanh, nông",
    "Ran rít/ran ẩm nhẹ ở phổi",
    "Không thấy dấu hiệu tràn dịch màng phổi",
    "Phổi âm vang bình thường",
    "Bụng mềm, không đau",
    "Bụng chướng nhẹ, nhu động ruột bình thường",
    "Đau vùng hạ sườn phải, nghi vấn gan/mật",
    "Gan, lách không sờ thấy",
    "Không có dấu hiệu xuất huyết tiêu hóa",
    "Tỉnh táo, tiếp xúc tốt",
    "Khám thần kinh cơ bản bình thường",
    "Yếu liệt chi trên/chi dưới nhẹ",
    "Phản xạ gân xương bình thường",
    "Rối loạn cảm giác khu trú",
    "Khớp mềm, không sưng đỏ",
    "Hạn chế vận động nhẹ ở khớp vai/gối",
    "Không đau khi gắng sức",
    "Không có dấu hiệu viêm khớp cấp",
    "Tai – mũi – họng bình thường",
    "Viêm họng nhẹ",
    "Niêm mạc mũi đỏ",
    "Không có dịch tai giữa",
    "Thị lực hai mắt bình thường",
    "Không thấy dấu hiệu tổn thương giác mạc",
    "Hốc mắt bình thường",
    "Không có dấu hiệu tăng áp lực nhãn cầu",
    "Da niêm bình thường",
    "Có mẩn đỏ nhẹ",
    "Không thấy dấu hiệu viêm nhiễm cấp",
    "Vết thương cũ liền tốt",
    "Khám tổng thể chưa phát hiện bất thường nghiêm trọng",
    "Cần theo dõi thêm hoặc thực hiện xét nghiệm cận lâm sàng",
    "Khuyến nghị chẩn đoán chuyên khoa nếu có dấu hiệu bất thường",
    "Kết luận sơ bộ: ổn định, chưa phát hiện tổn thương rõ",
];

const interpretationLabReportSuggestions = [
    "Công thức máu bình thường, chưa thấy dấu hiệu thiếu máu",
    "Hồng cầu, hemoglobin trong giới hạn bình thường",
    "Bạch cầu tăng, nghi ngờ nhiễm trùng cấp tính",
    "Bạch cầu giảm, cân nhắc theo dõi hoặc xét nghiệm bổ sung",
    "Tiểu cầu giảm nhẹ, cần theo dõi nguy cơ xuất huyết",
    "Tiểu cầu tăng, có thể do viêm hoặc tình trạng mạn tính",
    "Đường huyết bình thường",
    "Đường huyết tăng, nghi ngờ rối loạn glucose / đái tháo đường",
    "Chức năng gan (AST, ALT, GGT) bình thường",
    "Men gan tăng nhẹ, có thể do viêm gan hoặc thuốc",
    "Chức năng thận (ure, creatinine) trong giới hạn bình thường",
    "Lipid máu (cholesterol, triglyceride, LDL, HDL) bình thường",
    "Rối loạn lipid máu, nguy cơ xơ vữa mạch",
    "Tổng phân tích nước tiểu bình thường",
    "Nước tiểu có protein / hồng cầu / bạch cầu → cần đánh giá thêm",
    "Cấy nước tiểu âm tính với vi khuẩn",
    "Cấy nước tiểu dương tính, nghi ngờ nhiễm trùng đường tiết niệu",
    "Kháng thể HIV / viêm gan B/C âm tính",
    "CRP tăng nhẹ, gợi ý tình trạng viêm",
    "Xét nghiệm ký sinh trùng âm tính",
    "Cấy máu chưa phát hiện vi khuẩn",
    "Kết quả kháng nguyên dương tính, cần xác nhận bằng test bổ sung",
    "TSH, FT4 bình thường, chưa thấy dấu hiệu rối loạn tuyến giáp",
    "TSH tăng, gợi ý suy giáp",
    "HbA1c trong giới hạn bình thường / tăng, đánh giá kiểm soát glucose dài hạn",
    "Rối loạn hormon giới tính hoặc tuyến thượng thận chưa phát hiện rõ",
    "Kết quả xét nghiệm chưa phát hiện bất thường nghiêm trọng",
    "Cần theo dõi lại sau 1–2 tuần hoặc làm xét nghiệm bổ sung",
    "Một số chỉ số bất thường, đề nghị đánh giá chuyên khoa phù hợp",
    "Kết quả xét nghiệm phù hợp với chẩn đoán lâm sàng ban đầu",
    "Không phát hiện dấu hiệu viêm cấp / mạn tính đáng kể",
];

const interpretationImagingReportSuggestions = [
    "Hình ảnh X-quang phổi bình thường, chưa phát hiện tổn thương rõ",
    "Hình ảnh X-quang phổi thấy tổn thương thâm nhiễm nhẹ, cần theo dõi",
    "Không phát hiện tràn dịch màng phổi",
    "Không thấy dị vật hoặc nốt bất thường",
    "X-quang tim-thực quản bình thường",
    "Tăng sáng / dày màng phổi, nghi ngờ viêm mạn tính",
    "CT ngực bình thường, không thấy tổn thương mô phổi",
    "CT sọ não bình thường, chưa phát hiện sang chấn hoặc tổn thương",
    "CT bụng phát hiện tổn thương dạng nang/ u nhỏ, cần theo dõi hoặc sinh thiết",
    "CT cột sống thấy thoái hóa nhẹ, không có chèn ép thần kinh rõ",
    "CT mạch máu (CTA) chưa phát hiện tắc mạch hoặc dị dạng",
    "MRI não bình thường, chưa thấy sang chấn hoặc khối u",
    "MRI cột sống phát hiện thoát vị đĩa đệm nhẹ",
    "MRI khớp gối/ vai/ hông bình thường",
    "MRI phát hiện viêm mô mềm hoặc tụ dịch nhẹ, cần theo dõi",
    "Siêu âm ổ bụng bình thường, chưa phát hiện u, nang, sỏi",
    "Siêu âm gan-mật-tụy bình thường",
    "Siêu âm thận/bàng quang bình thường, không sỏi niệu",
    "Siêu âm tim (ECHO) chức năng bình thường",
    "Siêu âm mô mềm thấy nang/ u nhỏ, chưa xác định tính chất",
    "Kết quả chụp chiếu chưa phát hiện bất thường nghiêm trọng",
    "Một số thay đổi nhẹ, cần theo dõi định kỳ",
    "Tổn thương nghi ngờ, đề nghị đánh giá chuyên khoa",
    "Hình ảnh phù hợp với chẩn đoán lâm sàng ban đầu",
    "Chưa phát hiện dấu hiệu cấp cứu trên phim/scan",
];

const focusImagingSuggestions = [
    // Phổi
    "Phổi phải",
    "Phổi trái",
    "Cung xương sườn",
    "Màng phổi",
    "Trung thất",
    "Khí quản",
    "Phế quản chính",

    // Tim
    "Tim",
    "Các buồng tim",
    "Đường viền tim",

    // Cột sống
    "Đốt sống cổ",
    "Đốt sống ngực",
    "Đốt sống thắt lưng",
    "Đĩa đệm",
    "Cột sống cùng cụt",

    // Hệ bụng
    "Gan",
    "Mật",
    "Tụy",
    "Thận phải",
    "Thận trái",
    "Bàng quang",
    "Lách",
    "Ổ bụng chung",

    // Khớp / xương
    "Khớp vai",
    "Khớp gối",
    "Khớp hông",
    "Xương chậu",
    "Xương cẳng tay",
    "Xương cẳng chân",
    "Xương sọ",

    // Não & thần kinh
    "Não",
    "Não thất",
    "Cột sống cổ",
    "Cột sống ngực",
    "Cột sống thắt lưng",
    "Mô mềm quanh sọ",

    // Mạch máu
    "Động mạch chủ",
    "Động mạch phổi",
    "Các tĩnh mạch chính",

    // Mô mềm
    "Mô mềm vùng cổ",
    "Mô mềm vùng bụng",
    "Mô mềm chi trên",
    "Mô mềm chi dưới",
];

const assessmentItemSuggestions = [
    // Lý do vào viện / triệu chứng
    "Sốt kéo dài",
    "Ho khan / ho có đờm",
    "Đau bụng",
    "Đau đầu",
    "Khó thở khi gắng sức",
    "Mệt mỏi, uể oải",
    "Nôn / buồn nôn",
    "Tiêu chảy / táo bón",
    "Ngất / chóng mặt",
    "Sưng tấy chi dưới",
    "Phát ban, nổi mẩn",

    // Quá trình bệnh lý
    "Bệnh tim mạch",
    "Đái tháo đường",
    "Tăng huyết áp",
    "Bệnh thận mạn tính",
    "Hen suyễn",
    "Viêm gan B/C",
    "Ung thư",
    "Rối loạn lipid máu",
    "Phẫu thuật trước đây",

    // Bản thân / tiền sử cá nhân
    "Dị ứng thuốc: Penicillin",
    "Dị ứng thực phẩm: hải sản",
    "Thuốc đang dùng: Metformin",
    "Thuốc đang dùng: Insulin",
    "Thuốc đang dùng: Thuốc hạ huyết áp",
    "Thuốc đang dùng: Thuốc chống đông",

    // Gia đình / tiền sử gia đình
    "Tiền sử gia đình: tiểu đường",
    "Tiền sử gia đình: tăng huyết áp",
    "Tiền sử gia đình: bệnh tim mạch",
    "Tiền sử gia đình: ung thư",

    // Toàn thân / các bộ phận
    "Sinh hiệu bình thường",
    "Tỉnh táo, tiếp xúc tốt",
    "Mệt mỏi, da niêm nhợt",
    "Cân nặng, chiều cao bình thường",
    "Tư thế sinh hoạt bình thường",
    "Tim: nhịp đều, không tiếng thổi",
    "Phổi: thở đều, không ran",
    "Bụng: mềm, không đau",
    "Thận: không sờ thấy bất thường",
    "Da: bình thường, không nổi mẩn",
    "Thần kinh: phản xạ bình thường",

    // Tóm tắt kết quả lâm sàng
    "Kết quả lâm sàng phù hợp chẩn đoán sơ bộ",
    "Một số chỉ số bất thường, cần theo dõi",
    "Chưa phát hiện dấu hiệu cấp cứu",
    "Cần làm xét nghiệm / chụp chiếu bổ sung",

    // Đã xử lý với thuốc hoặc phương pháp
    "Đã dùng thuốc hạ sốt",
    "Đã dùng kháng sinh",
    "Đã bôi thuốc tại chỗ",
    "Đã thực hiện vật lý trị liệu",
    "Đã tiêm vaccine / thuốc phòng ngừa",

    // Chú ý
    "Cần theo dõi sát trong 24h tới",
    "Bệnh nhân cần nhập viện nếu triệu chứng tăng",
    "Theo dõi huyết áp / đường huyết",
    "Ghi nhận ý kiến bác sĩ chuyên khoa",

    // Khám chuyên khoa phổ biến
    // Tim mạch
    "Khám tim mạch: nhịp tim đều, không tiếng thổi",
    "Khám tim mạch: nghe tim có tiếng thổi",
    "Khám tim mạch: dấu hiệu suy tim",

    // Hô hấp
    "Khám phổi: ran ẩm / ran rít",
    "Khám phổi: không thấy ran",
    "Khám phổi: tăng / giảm âm vang phổi",

    // Tiêu hóa
    "Khám bụng: mềm, không đau",
    "Khám bụng: gan sờ thấy to",
    "Khám bụng: lách sờ thấy",

    // Thần kinh
    "Khám thần kinh: phản xạ gân xương bình thường",
    "Khám thần kinh: yếu liệt chi trên / chi dưới",
    "Khám thần kinh: rối loạn cảm giác",

    // Cơ xương khớp
    "Khám khớp: sưng / đỏ khớp",
    "Khám khớp: hạn chế vận động",
    "Khám xương: gãy / trật khớp",

    // Phụ sản
    "Khám sản khoa: tử cung bình thường",
    "Khám sản khoa: tử cung to / mềm",
    "Khám sản khoa: dịch âm đạo bất thường",

    // Nhi khoa
    "Khám nhi: cân nặng / chiều cao theo tuổi",
    "Khám nhi: biểu hiện bệnh lý thường gặp ở trẻ",
    "Khám nhi: tiêm chủng đầy đủ / chưa đầy đủ",

    "Không có",
]

const prescriptionSuggestions = [
    // Chung
    "Uống thuốc đúng liều, đúng giờ theo hướng dẫn.",
    "Không tự ý tăng hoặc giảm liều.",
    "Không tự ý dùng thêm thuốc khác.",
    "Tránh rượu bia và chất kích thích khi đang điều trị.",
    "Theo dõi triệu chứng và tái khám khi không cải thiện.",
    "Nếu có mẩn đỏ, khó thở, nghi ngờ dị ứng: ngừng thuốc và quay lại khám.",
    "Uống nhiều nước trong quá trình điều trị.",
    "Thuốc có thể gây buồn ngủ — tránh lái xe hay vận hành máy móc.",

    // Kháng sinh
    "Dùng đủ liều và đủ thời gian kháng sinh được kê.",
    "Không bỏ thuốc giữa chừng ngay cả khi thấy đỡ.",
    "Theo dõi tiêu chảy hoặc nổi ban khi dùng kháng sinh.",
    "Uống sau ăn để giảm kích ứng dạ dày.",

    // Huyết áp
    "Uống thuốc huyết áp vào cùng một thời điểm mỗi ngày.",
    "Theo dõi huyết áp tại nhà và ghi lại.",
    "Không tự ý ngưng thuốc huyết áp.",
    "Hạn chế ăn mặn và thức ăn nhiều dầu mỡ.",

    // Tiểu đường
    "Không bỏ bữa khi đang dùng thuốc tiểu đường.",
    "Theo dõi đường huyết theo hướng dẫn.",
    "Mang theo đồ ngọt đề phòng hạ đường huyết.",
    "Hạn chế đồ ngọt và tinh bột nhanh.",

    // Dạ dày
    "Uống thuốc dạ dày trước ăn 30 phút hoặc theo hướng dẫn.",
    "Tránh thức ăn cay, chua, nhiều dầu mỡ.",
    "Không nằm ngay sau ăn trong vòng 2 giờ.",
    "Hạn chế cà phê, trà đặc, rượu bia.",

    // Giảm đau – kháng viêm
    "Uống thuốc giảm đau sau ăn để tránh đau dạ dày.",
    "Không dùng nhiều loại thuốc giảm đau cùng lúc.",
    "Tránh dùng chung với rượu và thuốc chống đông.",
    "Theo dõi đau bụng hoặc phân đen khi dùng kháng viêm.",

    // Hô hấp
    "Giữ ấm cơ thể và uống đủ nước.",
    "Tránh khói thuốc, bụi và môi trường lạnh.",
    "Súc miệng nước muối 2–3 lần/ngày.",
    "Tái khám nếu khó thở hoặc sốt kéo dài.",

    // Tim mạch
    "Hạn chế ăn mặn và chất béo.",
    "Không vận động quá sức.",
    "Theo dõi đau ngực và tái khám ngay nếu tăng.",
    "Dùng thuốc tim mạch đều đặn, không bỏ liều.",

    // Cơ xương khớp
    "Nghỉ ngơi vùng tổn thương và tránh vận động mạnh.",
    "Chườm lạnh trong 48 giờ đầu khi sưng đau.",
    "Tập phục hồi chức năng theo chỉ định.",
    "Báo ngay nếu có tê yếu tay chân."
];

export const SUGGESTIONS = {
    REQUEST_ADD_SERVICE: requestAddServiceSuggestions,
    REQUEST_SPECIALIST_APPOINTMENT: requestSpecialistAppointmentSuggestions,
    GENERAL_CONSULTATION: generalConsultationSuggestions,
    INTERPRETATION_LAB_REPORT: interpretationLabReportSuggestions,
    INTERPRETATION_IMAGING_REPORT: interpretationImagingReportSuggestions,
    FOCUS_IMAGING: focusImagingSuggestions,
    ASSESSMENT_ITEM: assessmentItemSuggestions,
    PRESCRIPTION: prescriptionSuggestions,
};