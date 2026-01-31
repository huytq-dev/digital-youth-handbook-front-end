        import { useReducedMotion } from "@/hooks/use-reduced-motion";
        import { motion, useInView } from "framer-motion";
        import { Mail, MessageSquare, Send } from "lucide-react";
        import { useRef, useState } from "react";
        import type { ChangeEvent, FormEvent } from "react";
        import { baseUrl } from "@/config";
        import { showToast } from "@/lib/toast";

        // --- 1. CÁC COMPONENT TRANG TRÍ & UI NHỎ ---

        // Huy hiệu phong bì thư
        const MailBadge = () => (
            <motion.div
                className="absolute -top-6 -left-4 md:-left-8 bg-pink-400 border-2 border-black p-3 rounded-lg shadow-[4px_4px_0px_black] z-20 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0], y: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                <Mail size={28} className="text-white stroke-black stroke-2" />
            </motion.div>
        );

        // Họa tiết trang trí
        const DoodleShape = ({ className, delay, type = "circle" }: { className?: string; delay?: number, type?: "circle" | "cross" }) => (
            <motion.div
                className={`absolute text-slate-800 ${className}`}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, delay: delay, repeat: Infinity }}
            >
                {type === "circle" ? (
                    <div className="w-4 h-4 rounded-full border-2 border-black bg-yellow-400" />
                ) : (
                    <div className="text-2xl font-black text-blue-500 leading-none">+</div>
                )}
            </motion.div>
        );

        // Input Field theo style Brutalism
        const BrutalistInput = ({
            label,
            type = "text",
            placeholder,
            rows,
            name,
            value,
            onChange,
            required,
            disabled,
        }: {
            label: string;
            type?: string;
            placeholder?: string;
            rows?: number;
            name?: string;
            value?: string;
            onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
            required?: boolean;
            disabled?: boolean;
        }) => {
            return (
                <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-sm font-black uppercase tracking-wider text-slate-800">{label}</label>
                    {rows ? (
                        <textarea
                            rows={rows}
                            name={name}
                            value={value}
                            onChange={onChange}
                            required={required}
                            disabled={disabled}
                            className="w-full bg-slate-50 border-2 border-black p-3 font-medium placeholder:text-slate-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_black] focus:-translate-y-1 transition-all duration-200 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                            placeholder={placeholder}
                        />
                    ) : (
                        <input
                            type={type}
                            name={name}
                            value={value}
                            onChange={onChange}
                            required={required}
                            disabled={disabled}
                            className="w-full bg-slate-50 border-2 border-black p-3 font-medium placeholder:text-slate-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_black] focus:-translate-y-1 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            placeholder={placeholder}
                        />
                    )}
                </div>
            )
        }

        // --- 2. MAIN COMPONENT: CONTACT BLOCK ---

        export const LandingContact = () => {
            const shouldReduceMotion = useReducedMotion();
            const sectionRef = useRef(null);
            const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
            const [isSubmitting, setIsSubmitting] = useState(false);
            const [formValues, setFormValues] = useState({
                userName: "",
                userEmail: "",
                subject: "",
                body: "",
            });

            const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const { name, value } = event.target;
                setFormValues((prev) => ({ ...prev, [name]: value }));
            };

            const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();

                if (!formValues.userName || !formValues.userEmail || !formValues.subject || !formValues.body) {
                    showToast.error("Vui lòng điền đầy đủ thông tin.");
                    return;
                }

                try {
                    setIsSubmitting(true);
                    const response = await fetch(`${baseUrl}mails/contact`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userEmail: formValues.userEmail,
                            userName: formValues.userName,
                            subject: formValues.subject,
                            body: formValues.body,
                        }),
                    });

                    if (!response.ok) {
                        const errorPayload = await response.json().catch(() => null);
                        const message = errorPayload?.message || "Không thể gửi tin nhắn. Vui lòng thử lại.";
                        showToast.error(message);
                        return;
                    }

                    const payload = await response.json().catch(() => null);
                    showToast.success(payload?.message || "Đã gửi mail thành công.");
                    setFormValues({ userName: "", userEmail: "", subject: "", body: "" });
                } catch (error) {
                    showToast.error("Lỗi hệ thống gửi mail. Vui lòng thử lại sau.");
                } finally {
                    setIsSubmitting(false);
                }
            };

            return (
                <section
                    id="landing-contact"
                    ref={sectionRef}
                    className="relative py-20 overflow-hidden bg-[#fff9f0] border-b-4 border-black font-sans"
                >

                    {/* Background Texture */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                    />

                    {/* Trang trí nền */}
                    <DoodleShape className="top-12 left-[10%]" delay={0} type="cross" />
                    <DoodleShape className="bottom-12 right-[5%]" delay={1} type="circle" />

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

                        <motion.div
                            className="relative"
                            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                            animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                        >
                            {/* Lớp bóng đen cứng phía sau */}
                            <div className="absolute inset-0 bg-black rounded-sm translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" />

                            {/* Khung Contact Chính */}
                            <div className="relative bg-white border-2 border-black flex flex-col md:flex-row shadow-none">

                                {/* Cột Trái: Thông tin liên hệ */}
                                <div className="md:w-2/5 p-8 border-b-2 md:border-b-0 md:border-r-2 border-black bg-blue-50 relative overflow-hidden">
                                    <MailBadge />

                                    <div className="relative z-10 mt-6">
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-2">
                                            ĐIỀU EM MUỐN NÓI
                                        </h3>
                                        <p className="text-slate-600 font-medium mb-8 text-sm md:text-base">
                                            Thắc mắc về bài học, tài khoản hay có ý tưởng hay ho? Đừng ngại nhắn cho chúng mình nhé!
                                        </p>

                                        <div className="space-y-4">
                                            {/* Info Item 1 */}
                                            {/* <div className="flex items-start gap-3 group cursor-default">
                                                <div className="p-2 bg-white border-2 border-black shadow-[2px_2px_0px_black] group-hover:bg-yellow-300 transition-colors">
                                                    <MapPin size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm uppercase">Văn phòng</p>
                                                    <p className="text-sm text-slate-700">Trường Đại học FPT Đà Nẵng</p>
                                                </div>
                                            </div> */}

                                            {/* Info Item 2 */}
                                            {/* <div className="flex items-start gap-3 group cursor-pointer">
                                                <div className="p-2 bg-white border-2 border-black shadow-[2px_2px_0px_black] group-hover:bg-yellow-300 transition-colors">
                                                    <MessageSquare size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm uppercase">Hòm thư</p>
                                                    <p className="text-sm text-slate-700">banbientap@tuoitre.vn</p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>

                                    {/* Họa tiết trang trí góc dưới trái */}
                                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full border-2 border-black opacity-50 pointer-events-none" />
                                </div>

                                {/* Cột Phải: Form */}
                                <div className="md:w-3/5 p-8 md:p-10 bg-white">
                                    <form className="space-y-1" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <BrutalistInput
                                                label="Tên của bạn"
                                                name="userName"
                                                value={formValues.userName}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                            <BrutalistInput
                                                label="Email"
                                                type="email"
                                                name="userEmail"
                                                value={formValues.userEmail}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <BrutalistInput
                                            label="Chủ đề"
                                            name="subject"
                                            value={formValues.subject}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                        />

                                        <BrutalistInput
                                            label="Bạn muốn nhắn gì?"
                                            name="body"
                                            rows={4}
                                            value={formValues.body}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                        />

                                        {/* Button Gửi */}
                                        <div className="pt-4 flex justify-end">
                                            <motion.button
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98, y: 0 }}
                                                disabled={isSubmitting}
                                                className="relative bg-yellow-400 text-black border-2 border-black px-8 py-3 font-black uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:bg-yellow-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_black]"
                                            >
                                                {isSubmitting ? "Đang Gửi..." : "Gửi Tin Nhắn"}
                                                <Send size={18} strokeWidth={3} />
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>

                                {/* Góc trang trí (Giống Quote) */}
                                <div
                                    className="absolute top-0 right-0 w-8 h-8 bg-slate-200 border-l-2 border-b-2 border-black"
                                    style={{ background: "linear-gradient(225deg, transparent 50%, rgba(0,0,0,0.1) 50%)" }}
                                />
                            </div>
                        </motion.div>

                    </div>
                </section>
            );
        };
