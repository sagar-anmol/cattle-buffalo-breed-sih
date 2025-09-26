'use server';

/**
 * @fileOverview Cattle breed identification AI agent.
 *
 * - identifyCattleBreed - A function that handles the cattle breed identification process.
 * - IdentifyCattleBreedInput - The input type for the identifyCattleBreed function.
 * - IdentifyCattleBreedOutput - The return type for the identifyCattleBreed function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyCattleBreedInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of cattle, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyCattleBreedInput = z.infer<typeof IdentifyCattleBreedInputSchema>;

const IdentifyCattleBreedOutputSchema = z.object({
  breed: z.string().describe('The identified breed of the cattle.'),
});
export type IdentifyCattleBreedOutput = z.infer<typeof IdentifyCattleBreedOutputSchema>;

export async function identifyCattleBreed(input: IdentifyCattleBreedInput): Promise<IdentifyCattleBreedOutput> {
  return identifyCattleBreedFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyCattleBreedPrompt',
  input: {schema: IdentifyCattleBreedInputSchema},
  output: {schema: IdentifyCattleBreedOutputSchema},
  prompt: `You are an expert in cattle breeds.  You will identify the breed of cattle in the photo.

  Photo: {{media url=photoDataUri}}`,
});

const identifyCattleBreedFlow = ai.defineFlow(
  {
    name: 'identifyCattleBreedFlow',
    inputSchema: IdentifyCattleBreedInputSchema,
    outputSchema: IdentifyCattleBreedOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
