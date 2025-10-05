'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from './Button';

const contactSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message trop court'),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité" }),
  }),
});

type ContactFormState =
  | { status: 'idle' | 'submitting'; errors: Partial<Record<keyof z.infer<typeof contactSchema>, string>>; message?: string }
  | { status: 'success'; errors: Record<string, never>; message: string };

const initialState: ContactFormState = { status: 'idle', errors: {} };

export function FormContact() {
  const [state, setState] = useState<ContactFormState>(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      company: formData.get('company')?.toString() ?? '',
      budget: formData.get('budget')?.toString() ?? '',
      message: formData.get('message')?.toString() ?? '',
      consent: formData.get('consent') === 'on',
    };

    const parse = contactSchema.safeParse(values);
    if (!parse.success) {
      const errors: Partial<Record<string, string>> = {};
      for (const issue of parse.error.issues) {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      }
      setState({ status: 'idle', errors: errors as ContactFormState['errors'] });
      return;
    }

    setState({ status: 'submitting', errors: {} });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parse.data),
      });
      if (!response.ok) {
        throw new Error('Erreur serveur');
      }
      const data = (await response.json()) as { ok: boolean };
      if (data.ok) {
        setState({ status: 'success', errors: {}, message: 'Merci ! Nous revenons vers vous sous 24h.' });
        event.currentTarget.reset();
      } else {
        throw new Error('Erreur inconnue');
      }
    } catch (error) {
      setState({ status: 'idle', errors: {}, message: "Impossible d'envoyer le message. Réessayez plus tard." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
            Nom complet
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-invalid={Boolean(state.errors.name)}
            aria-describedby={state.errors.name ? 'name-error' : undefined}
          />
          {state.errors.name ? (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {state.errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
            Email professionnel
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-invalid={Boolean(state.errors.email)}
            aria-describedby={state.errors.email ? 'email-error' : undefined}
          />
          {state.errors.email ? (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {state.errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-slate-700">
            Entreprise
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-slate-700">
            Budget mensuel estimé
          </label>
          <select
            id="budget"
            name="budget"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            defaultValue=""
          >
            <option value="" disabled>
              Sélectionnez une tranche
            </option>
            <option value="<5k">Moins de 5k€</option>
            <option value="5-10k">5k€ - 10k€</option>
            <option value="10-25k">10k€ - 25k€</option>
            <option value=">25k">Plus de 25k€</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
          Votre besoin
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-invalid={Boolean(state.errors.message)}
          aria-describedby={state.errors.message ? 'message-error' : undefined}
        />
        {state.errors.message ? (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {state.errors.message}
          </p>
        ) : null}
      </div>
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-invalid={Boolean(state.errors.consent)}
          aria-describedby={state.errors.consent ? 'consent-error' : undefined}
        />
        <label htmlFor="consent" className="text-sm text-slate-600">
          J&apos;accepte que Market-IA me contacte et j&apos;ai lu la politique de confidentialité.
        </label>
      </div>
      {state.errors.consent ? (
        <p id="consent-error" className="text-sm text-red-600">
          {state.errors.consent}
        </p>
      ) : null}
      {state.status === 'success' && state.message ? (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{state.message}</p>
      ) : null}
      {state.status !== 'success' && state.message ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </Button>
    </form>
  );
}
