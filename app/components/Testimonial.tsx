import { Card } from './Card';

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
};

export function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <Card className="h-full">
      <blockquote className="text-base text-slate-200">“{quote}”</blockquote>
      <div className="mt-6">
        <p className="text-sm font-semibold text-white">{author}</p>
        <p className="text-sm text-slate-300">{role}</p>
      </div>
    </Card>
  );
}
