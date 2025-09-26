import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'login-bg');

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-8">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0 opacity-20"
          priority
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
