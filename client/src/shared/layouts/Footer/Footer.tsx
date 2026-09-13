import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logo_img } from '~/assets/imgs/logo';
import { Img } from '~/components';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return (
        <footer className="bg-[#f8f9fa] py-6 px-4 text-[#212529] font-sans border-t border-[#dee2e6]">
            <div className="max-w-[1200px] mx-auto">
                {/* === GIAO DIỆN ĐIỆN THOẠI (Gọn gàng, chữ vừa vặn) === */}
                <div className="block md:hidden text-center space-y-3">
                    <p className="text-[15px] font-semibold text-[#343a40]">Đạt Nguyễn • Personal Website</p>

                    <div className="flex justify-center gap-6 text-[14px] font-medium">
                        <a
                            href="https://github.com/datnguyentb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[15px] text-[#0d6efd] no-underline transition-colors duration-200 hover:text-[#084298] hover:underline"
                        >
                            <FontAwesomeIcon icon={faGithub} className="mr-2 text-[16px]" />
                            GitHub
                        </a>
                        <a
                            href="https://www.youtube.com/@DatNguyen-xv6bh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[15px] text-[#0d6efd] no-underline transition-colors duration-200 hover:text-[#084298] hover:underline"
                        >
                            <FontAwesomeIcon icon={faYoutube} className="mr-2 text-[16px]" />
                            YouTube
                        </a>
                        <a
                            href="mailto:dat.nt170499@gmail.com"
                            className="inline-flex items-center text-[15px] text-[#0d6efd] no-underline transition-colors duration-200 hover:text-[#084298] hover:underline"
                        >
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-[16px]" />
                            Email
                        </a>
                    </div>

                    <p className="text-[13px] text-[#6c757d]">Vu Thu, Thai Binh</p>
                </div>

                {/* === GIAO DIỆN MÁY TÍNH (Chữ dùng px chuẩn, không bị ảnh hưởng bởi 1rem=10px) === */}
                <div className="hidden md:grid grid-cols-4 gap-10 text-left items-start">
                    <div className="w-[100px]">
                        <Img src={logo_img.main_logo} className="w-full h-auto object-contain" />
                    </div>

                    <div>
                        <div className="space-y-2 [&_p]:text-[15px] [&_p]:text-[#495057] [&_strong]:font-semibold">
                            <p>
                                <strong>Personal Website:</strong> Đạt Nguyễn
                            </p>
                            <p>
                                <strong>Address:</strong> Vu Thu District, Thai Binh
                            </p>
                            <p>
                                <strong>Email:</strong> dat.nt170499@gmail.com
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[18px] font-semibold mb-3 text-[#343a40]">About Me</h4>
                        <p className="text-[15px] leading-relaxed text-[#495057]">
                            I'm a passionate web developer. This is where I keep my projects, articles, and personal
                            shares.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[18px] font-semibold mb-3 text-[#343a40]">Connect</h4>
                        <div className="space-y-2">
                            <p>
                                <a
                                    href="https://github.com/datnguyentb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-[15px] text-[#495057] no-underline transition-colors duration-200 hover:text-[#24292e]"
                                >
                                    <FontAwesomeIcon
                                        icon={faGithub}
                                        className="mr-3 text-[18px] text-[#333] transition-transform duration-200 hover:scale-110"
                                    />
                                    GitHub
                                </a>
                            </p>
                            <p>
                                <a
                                    href="https://www.youtube.com/@DatNguyen-xv6bh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-[15px] text-[#495057] no-underline transition-colors duration-200 hover:text-[#ff0000]"
                                >
                                    <FontAwesomeIcon
                                        icon={faYoutube}
                                        className="mr-3 text-[18px] text-[#ff0000] transition-transform duration-200 hover:scale-110"
                                    />
                                    YouTube
                                </a>
                            </p>
                            <p>
                                <a
                                    href="mailto:dat.nt170499@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-[15px] text-[#495057] no-underline transition-colors duration-200 hover:text-[#0d6efd]"
                                >
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="mr-3 text-[18px] text-[#0d6efd] transition-transform duration-200 hover:scale-110"
                                    />
                                    Email
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
