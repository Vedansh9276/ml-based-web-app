"use client"

import { motion } from "framer-motion"
import { BrainModel } from "./brain-model"
import { ParticleEffect } from "./particle-effect"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/50">
      <ParticleEffect />
      <BrainModel />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
            style={{ textShadow: "0 0 20px rgba(255,20,147,0.3)" }}
          >
            NEUROSKETCH
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            BRAIN WELLNESS SCAN
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Button size="lg" className="text-lg px-8">
              Book Your Scan Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

