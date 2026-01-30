import PageContainer from "@/components/PageContainer";
import QualityAssetList from "../asset/favorite/List";
import { RocketOutlined } from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter";
import { Button } from "antd";

const Page = () => {
    const router = useRouter()

    return (
        <PageContainer title={'首页'}>
            <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden font-sans selection:bg-[#7150ff]/20 selection:text-[#7150ff]">

                {/* Subtle Background Noise/Gradient */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#7150ff]/10 to-[#a18aff]/5 rounded-full blur-[120px] opacity-60 mix-blend-multiply"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#5a3bc4]/10 to-[#7150ff]/5 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015]"></div>
                </div>

                {/* Quality Assets Preview */}
                <section className="relative pb-20 px-6 z-10">
                    <div className="max-w-7xl mx-auto">
                        <QualityAssetList />
                    </div>
                </section>

                {/* Footer Simple */}
                <footer className="py-12 text-center text-gray-400 text-sm border-t border-gray-100/50 relative z-10">
                    <p>© 2024 Yoozy Pro Studio. All rights reserved.</p>
                </footer>

            </div>

            {/* Global Styles for Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes float-slower {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
                .animate-float-slower { animation: float-slower 8s ease-in-out infinite; }
                .animate-fade-in { animation: fade-in 1s ease-out; }
                .animate-fade-in-up { animation: fade-in-up 1s ease-out backwards; }
                .animate-fade-in-down { animation: fade-in-down 1s ease-out backwards; }
                .animate-slide-up { animation: slide-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
            `}} />
        </PageContainer>
    )
}

export default Page
