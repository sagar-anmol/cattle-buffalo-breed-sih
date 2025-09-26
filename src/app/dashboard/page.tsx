import { CattleIdentifier } from '@/components/dashboard/CattleIdentifier';
import { CattleIcon } from '@/components/icons/CattleIcon';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
      <header className="w-full p-4 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto flex items-center gap-3">
            <CattleIcon className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">CattleSnap</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8 w-full">
        <CattleIdentifier />
      </main>
    </div>
  );
}
