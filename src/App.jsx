import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const FloatingHearts = () => (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", x: Math.random() * 100 + "%", opacity: 0 }}
          animate={{ y: "-10%", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          className="absolute text-pink-200 text-2xl"
        >
          💖
        </motion.span>
      ))}
    </div>
  );

  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [answered, setAnswered] = useState(false);

  const handleNoHover = () => {
    const randX = Math.floor(Math.random() * 200 - 100);
    const randY = Math.floor(Math.random() * 200 - 100);
    setNoPos({ x: randX, y: randY });
    setYesScale((s) => Math.min(s + 0.1, 2.5));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-rose-300 to-purple-300">
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-xl bg-white/20 p-10 rounded-2xl shadow-xl text-center max-w-md"
      >
        {!answered ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-4">
              Yashashree 💖
            </h1>
            <p className="text-xl text-white mb-8">Will you be my Valentine?</p>

            <div className="relative flex justify-center gap-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                style={{ scale: yesScale }}
                onClick={() => {
                  confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                  });
                  setAnswered(true);
                }}
                className="px-6 py-3 bg-pink-500 text-white rounded-xl shadow-lg"
              >
                Yes 💕
              </motion.button>

              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                onMouseEnter={handleNoHover}
                className="px-6 py-3 bg-white/30 text-white rounded-xl shadow-lg"
              >
                No 😅
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-4">Yay! 🎉</h2>
            <p className="text-xl text-white">See you on Valentine’s Day ❤️</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
