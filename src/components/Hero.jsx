import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-slate-900 to-slate-800">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
            >
                2025년 클럽 회고
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-xl md:text-2xl text-slate-300 max-w-2xl"
            >
                서울의 중심을 탐험하며, 한 걸음씩.
            </motion.p>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-10"
            >
                <a href="#stats" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-lg font-semibold transition-colors">
                    우리의 여정 보기
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;
