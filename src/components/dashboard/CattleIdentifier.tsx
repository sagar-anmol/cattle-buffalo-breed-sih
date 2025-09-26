'use client';

import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { identifyCattleBreed } from '@/ai/flows/identify-cattle-breed';
import { Upload, Camera, Loader2, CheckCircle, AlertCircle, RefreshCw, Badge } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Step = 'UPLOAD' | 'ANALYZING' | 'RESULT' | 'CONFIRM' | 'SYNCING' | 'ERROR';

export function CattleIdentifier() {
  const [step, setStep] = useState<Step>('UPLOAD');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [breed, setBreed] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [router]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUri = e.target?.result as string;
        setImageUrl(dataUri);
        setStep('ANALYZING');
        try {
          const result = await identifyCattleBreed({ photoDataUri: dataUri });
          setBreed(result.breed);
          setStep('RESULT');
        } catch (err) {
          console.error(err);
          setError('Could not identify the breed. The AI model may be unavailable or the image may be unsuitable. Please try another image.');
          setStep('ERROR');
        }
      };
      reader.onerror = () => {
        setError('Failed to read the image file.');
        setStep('ERROR');
      }
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    setStep('SYNCING');
    setTimeout(() => {
      sessionStorage.removeItem('isAuthenticated');
      router.push('/');
    }, 3000);
  };

  const handleReset = () => {
    setImageUrl(null);
    setBreed('');
    setError('');
    setStep('UPLOAD');
  };

  useEffect(() => {
    if (step === 'RESULT') {
      const timer = setTimeout(() => {
        setStep('CONFIRM');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);
  
  if (!isClient) {
    return null; // or a loading skeleton
  }

  const renderContent = () => {
    switch (step) {
      case 'UPLOAD':
        return (
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Identify Cattle or Buffalo</h2>
            <p className="text-muted-foreground mb-8">Please upload or capture an image.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <Button size="lg" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
              </Button>
              <input type="file" accept="image/*" capture="user" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
              <Button size="lg" variant="secondary" onClick={() => cameraInputRef.current?.click()}>
                <Camera className="mr-2 h-5 w-5" />
                Capture Image
              </Button>
            </div>
          </div>
        );

      case 'ANALYZING':
        return (
          <div className="text-center flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">Analyzing Image...</h2>
            <p className="text-muted-foreground">Please wait while we identify the breed.</p>
            {imageUrl && (
              <div className="mt-4 w-full max-w-xs rounded-lg overflow-hidden shadow-lg">
                <Image src={imageUrl} alt="Cattle for analysis" width={400} height={300} className="object-cover w-full h-auto" />
              </div>
            )}
          </div>
        );
      
      case 'RESULT':
      case 'CONFIRM':
        return (
          <div className="text-center flex flex-col items-center gap-4">
             {imageUrl && (
              <div className="mb-4 w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
                <Image src={imageUrl} alt="Identified Cattle" width={400} height={300} className="object-cover w-full h-auto" />
              </div>
            )}
            <CheckCircle className="h-12 w-12 text-green-600" />
            <h2 className="text-2xl font-semibold">Breed Identified</h2>
            <p className="text-xl text-accent-foreground bg-accent px-4 py-2 rounded-md font-bold">
              {breed}
            </p>
            {step === 'CONFIRM' && (
              <div className="mt-6 flex flex-col items-center gap-4 animate-fade-in">
                 <p className="text-lg">Is this correct?</p>
                <Button size="lg" onClick={handleConfirm} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Confirm & Sync
                </Button>
              </div>
            )}
          </div>
        );

      case 'SYNCING':
        return (
          <div className="text-center flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">Syncing with BPA database...</h2>
            <p className="text-muted-foreground">Your data is being saved. Please wait.</p>
          </div>
        );
      
      case 'ERROR':
        return (
            <div className="text-center flex flex-col items-center gap-4 w-full">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <h2 className="text-xl font-semibold text-destructive">Identification Failed</h2>
                <Alert variant="destructive" className="max-w-md">
                    <AlertTitle>An Error Occurred</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button onClick={handleReset} variant="outline" size="lg">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                </Button>
            </div>
        )
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-xl border-2 border-border/70">
      <CardContent className="p-6 md:p-12 min-h-[450px] flex items-center justify-center">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
