import confetti from "canvas-confetti";

export function celebrateStreak(milestone: number){
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      console.log(`🎉 Congrats on a ${milestone}-day streak!`)
}