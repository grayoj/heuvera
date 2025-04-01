"use client";

import { Card, CardContent } from "@heuvera/components/ui/card";
import { help } from "../../app/data/array";
import { Button } from "@heuvera/components/ui/button";
import {
  CircleHelp,
  EyeOff,
  Pencil,
  SquareArrowOutUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HelpProps {
  isVisible: boolean;
}

export default function Help({ isVisible }: HelpProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="flex flex-col md:flex-row lg:flex-col space-y-4 md:space-y-0 lg:space-y-5 md:space-x-4 lg:space-x-0"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {help.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            >
              <Card className="w-74 md:w-74 lg:w-52 xl:w-74 2xl:w-74 bg-[#F8F7F2] min-h-[200px] flex flex-col">
                <CardContent className="flex flex-col flex-1 gap-2.5">
                  <div className="text-[#7B4F3A] bg-[#7B4F3A80] w-fit p-2 rounded-full">
                    {index === 0 ? (
                      <EyeOff className="h-6 w-6" />
                    ) : index === 2 ? (
                      <Pencil className="h-6 w-6" />
                    ) : (
                      <SquareArrowOutUpRight className="h-6 w-6" />
                    )}
                  </div>
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                  <p className="text-[#898989] text-xs flex-1">
                    {item.description}
                  </p>
                  <Button
                    variant="outline"
                    className="hover:cursor-pointer bg-[#F8F7F2] max-w-fit mt-auto"
                  >
                    <CircleHelp />
                    Further Help
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
