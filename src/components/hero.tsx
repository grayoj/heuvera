import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <div className="relative">
            <div className="bg-[#7B4F3A] rounded-3xl w-full h-[600px] md:h-[300px] lg:h-[350px] xl:h-[500px] 2xl:h-[600px] flex flex-col flex-1 justify-center items-center relative overflow-hidden">
                <motion.h1
                    className="text-[#F8F7F2] text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif text-center z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Find <motion.span
                        className="text-[#B65E33]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        exclusive homes
                    </motion.span> that<br></br>fit your life style
                </motion.h1>

                <motion.div
                    className='w-32 bg-red-200 h-24 md:h-16 lg:h-24 xl:h-24 2xl:h-24 rounded-t-2xl absolute bottom-0 left-5 md:left-5 lg:left-5 xl:left-10 2xl:left-10'
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <Image src='/img4.jpeg' alt='property1' height={500} width={500} className='w-full h-full object-cover rounded-t-2xl' />
                </motion.div>

                <motion.div
                    className='w-32 md:w-32 lg:w-28 xl:w-32 bg-red-200 h-40 md:h-32 lg:h-28 xl:h-40 rounded-t-2xl absolute bottom-0 right-10 md:right-10 lg:right-10 xl:right-10 2xl:right-25'
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <Image src='/img3.jpeg' alt='property1' height={500} width={500} className='w-full h-full object-cover rounded-t-2xl' />
                </motion.div>

                <motion.div
                    className='w-24 md:w-32 lg:w-24 xl:w-32 2xl:w-32 bg-red-200 h-40 md:h-56 lg:h-40 xl:h-56 2xl:h-56 rounded-l-2xl shadow shadow-lg absolute top-8 md:top-10 lg:top-10 xl:top-10 2xl:top-10 right-0 block md:hidden lg:block'
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    <Image src='/img5.jpeg' alt='property1' height={500} width={500} className='w-full h-full object-cover rounded-l-2xl' />
                </motion.div>

                <motion.div
                    className='w-36 bg-red-200 h-32 md:h-28 lg:h-28 xl:h-32 rounded-b-2xl shadow shadow-lg absolute top-0 right-80'
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    <Image src='/img1.jpeg' alt='property1' height={500} width={500} className='w-full h-full object-cover rounded-b-2xl' />
                </motion.div>

                <motion.div
                    className='w-44 md:w-44 lg:w-36 xl:w-44 2xl:w-44 bg-red-200 h-56 md:h-56 lg:h-40 xl:h-56 2xl:h-56 rounded-b-2xl shadow shadow-lg absolute top-0 left-40 md:left-40 lg:left-10 xl:left-20 2xl:left-40 block hidden md:hidden lg:block'
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 1.0 }}
                >
                    <Image src='/img2.jpeg' alt='property1' height={500} width={500} className='w-full h-full object-cover rounded-b-2xl' />
                </motion.div>
            </div>
        </div>
    )
}