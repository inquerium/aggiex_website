"use client"
import { motion } from "framer-motion"
import { Users, MessageCircle, Share2, Target, UserPlus, User } from "lucide-react"

const SIZE = 420;
const CENTER = SIZE / 2;

const HeroAnimation = () => {
  const leadGenNodes = [
    { icon: MessageCircle, color: "bg-blue-500", position: { angle: 0, radius: 120 } },
    { icon: Target, color: "bg-green-500", position: { angle: 1, radius: 145 } },
    { icon: UserPlus, color: "bg-purple-500", position: { angle: 2, radius: 130 } },
    { icon: Users, color: "bg-orange-500", position: { angle: 3, radius: 160 } },
    { icon: Share2, color: "bg-pink-500", position: { angle: 4, radius: 125 } },
    { icon: User, color: "bg-emerald-500", position: { angle: 5, radius: 140 } },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  }

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  }

  return (
    <motion.div
      className="relative flex items-center justify-center mx-auto"
      style={{ width: SIZE, height: SIZE, minWidth: SIZE, minHeight: SIZE }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Subtle background silhouettes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`person-bg-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 2 }}
          >
            <User size={12} className="text-primary" />
          </motion.div>
        ))}
      </div>

      {/* Animated connection lines */}
      <svg className="absolute left-0 top-0" width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}> 
        {leadGenNodes.map((node, i) => {
          const angle = (node.position.angle / leadGenNodes.length) * 2 * Math.PI
          const x = CENTER + node.position.radius * Math.cos(angle)
          const y = CENTER + node.position.radius * Math.sin(angle)
          return (
            <motion.path
              key={`line-${i}`}
              d={`M${CENTER} ${CENTER} L${x} ${y}`}
              stroke="hsl(var(--primary) / 0.7)"
              strokeWidth="2.5"
              strokeDasharray="8 4"
              variants={lineVariants}
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          )
        })}
      </svg>

      {/* Lead Generation Nodes (no numbers/labels) */}
      {leadGenNodes.map((node, i) => {
        const angle = (node.position.angle / leadGenNodes.length) * 2 * Math.PI
        const x = CENTER + node.position.radius * Math.cos(angle) - 28
        const y = CENTER + node.position.radius * Math.sin(angle) - 28
        const IconComponent = node.icon
        return (
          <motion.div
            key={`node-${i}`}
            className="absolute"
            style={{ top: y, left: x, transformOrigin: "center center" }}
            variants={nodeVariants}
            whileHover={{ scale: 1.2, zIndex: 30 }}
            animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: i * 0.6, ease: "easeInOut" }}
          >
            <div className={`w-14 h-14 ${node.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 backdrop-blur-sm relative`}>
              <IconComponent className="text-white" size={22} />
            </div>
          </motion.div>
        )
      })}

      {/* Central IQ Hub */}
      <motion.div
        className="absolute left 1/2 top 1/2 w-32 h-32 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl z-10 border-4 border-white/30 -translate-x-1/2 -translate-y-1/2"
        variants={nodeVariants}
        whileHover={{ scale: 1.1, boxShadow: "0 0 50px hsl(var(--primary) / 0.8)" }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <span className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg select-none" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em' }}>IQ</span>
      </motion.div>
    </motion.div>
  )
}

export default HeroAnimation
