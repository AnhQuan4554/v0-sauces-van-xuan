import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="from-primary/10 to-accent/10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br via-white px-4">
      <div className="border-accent/20 w-full max-w-md rounded-3xl border bg-white/90 p-8 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
        <div className="mb-4 flex justify-center">
          <span className="bg-accent/30 inline-block animate-bounce rounded-full p-4 shadow-lg">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#fbbf24" />
              <path d="M12 8v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="#fff" />
            </svg>
          </span>
        </div>
        <h2 className="text-primary mb-2 text-4xl font-extrabold tracking-tight drop-shadow-lg">
          404 - Not Found
        </h2>
        <p className="text-muted-foreground animate-fade-in mb-8 text-base">
          Sorry, we couldn't find the page or product you were looking for.
        </p>
        <Link href="/" passHref>
          <Button
            asChild
            className="soft-button from-primary via-accent to-primary hover:from-accent hover:to-primary/80 focus:ring-accent/40 rounded-full bg-gradient-to-r px-8 py-3 text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus:ring-4"
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
