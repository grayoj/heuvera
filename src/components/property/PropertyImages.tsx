'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PropertyImages() {
  const [isOpen, setIsOpen] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
  ];

  return (
    <>
      {/* Main Property Image */}
      <div className="w-full h-[40rem] bg-blue-400 rounded-[3rem]">
        <Image
          src={images[0]}
          alt="Property main image"
          height={500}
          width={500}
          className="w-full h-full rounded-[3rem] object-cover"
        />
      </div>

      {/* Two Secondary Images */}
      <div className="flex flex-row gap-6 mt-6">
        <div className="w-6/12 h-60 rounded-[3rem]">
          <Image
            src={images[1]}
            alt="Property secondary image"
            height={500}
            width={500}
            className="w-full h-full rounded-[3rem] object-cover"
          />
        </div>
        <div className="w-6/12 h-60 rounded-[3rem]">
          <Image
            src={images[2]}
            alt="Property tertiary image"
            height={500}
            width={500}
            className="w-full h-full rounded-[3rem] object-cover"
          />
        </div>
      </div>

      {/* View More Pictures */}
      <div
        className="relative w-full h-[40rem] bg-blue-400 rounded-[3rem] overflow-hidden cursor-pointer mt-6"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={images[2]}
          alt="Property Image"
          layout="fill"
          objectFit="cover"
          className="rounded-[3rem]"
        />
        <div className="absolute bottom-6 right-6 w-56 h-32 rounded-[2rem] overflow-hidden">
          <Image
            src={images[2]}
            className="absolute inset-0 bg-cover bg-center blur-lg rounded-[3rem]"
            alt="Blurred background"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-serif font-medium">
            View 7 More Pictures
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex justify-between items-center text-white mb-6 p-10 w-full">
            <h2 className="text-2xl font-serif">Property Gallery</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-full h-full flex flex-wrap gap-3 p-10"
          >
            {images.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="w-[250px] h-[250px] rounded-xl overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Property image ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
}
