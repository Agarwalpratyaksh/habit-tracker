import { Button } from "@/components/ui/button";
import { Home, Compass, Chrome, PlusSquare, Share2 } from "lucide-react";
import Link from "next/link";

export default function InstallPage() {
  return (
    <div className="min-h-screen px-4 sm:px-8 py-8 sm:py-12 dark:bg-[#0a0a0a] text-gray-800 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center">
          Install <span className="text-[#444DFF]">Floee</span> on Your Phone
        </h1>

        <p className="text-center text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto">
          Use Floee like a native app — install it to your home screen in just a
          few taps.
        </p>

        <div className="space-y-8 sm:space-y-12">
          {/* iOS Steps */}
          <div className="bg-white/5 dark:bg-white/5 p-6 sm:p-8 rounded-xl">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-[#444DFF]" />
              For iOS (Safari)
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">1.</span>
                <span>
                  Open <strong>Safari</strong> and go to{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    floee.vercel.app
                  </code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">2.</span>
                <span>
                  Tap the <Share2 className="inline w-4 h-4 mb-1 mx-1" />{" "}
                  <strong>Share</strong> icon at the bottom of your screen.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">3.</span>
                <span>
                  Scroll down and tap{" "}
                  <PlusSquare className="inline w-4 h-4 mb-1 mx-1" />{" "}
                  <strong>“Add to Home Screen”</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">4.</span>
                <span>
                  Tap <strong>Add</strong> in the top-right corner.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">5.</span>
                <span>
                  You are done! Now you can use Floee like a native app.
                </span>
              </li>
            </ol>
          </div>

          {/* Android Steps */}
          <div className="bg-white/5 dark:bg-white/5 p-6 sm:p-8 rounded-xl">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-4">
              <Chrome className="w-5 h-5 text-[#444DFF]" />
              For Android (Chrome)
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">1.</span>
                <span>
                  Open <strong>Chrome</strong> and visit{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    floee.vercel.app
                  </code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">2.</span>
                <span>
                  Tap the 3-dot menu <span className="font-mono">⋮</span> in the
                  top-right corner.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">3.</span>
                <span>
                  Tap <strong>“Install App”</strong> or{" "}
                  <strong>“Add to Home screen”</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">4.</span>
                <span>
                  Confirm the prompt by tapping <strong>Install</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">5.</span>
                <span>Done! The app will now appear on your home screen.</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 flex justify-center">
          <Link href="/">
            <Button className="gap-2 px-6 py-2.5">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
