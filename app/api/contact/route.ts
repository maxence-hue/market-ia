import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10),
  consent: z.boolean().refine(Boolean, { message: 'Consentement requis' }),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // TODO: connecter à un service email ou webhook (Sendgrid, Resend, Make...)
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Invalid payload' }, { status: 400 });
  }
}
