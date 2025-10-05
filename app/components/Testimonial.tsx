import { Card } from './Card';

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
};

export function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <Card className="h-full bg-white">
      <blockquote className="text-base text-slate-700">“{quote}”</blockquote>
      <div className="mt-6">
        <p className="text-sm font-semibold text-slate-900">{author}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </Card>
  );
}
