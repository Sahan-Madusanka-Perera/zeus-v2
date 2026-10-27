import Image, { getImageProps } from 'next/image';
import { leaders } from '@/content/site';
import { Words } from '@/components/split';

function CrewPhoto() {
  const common = { alt: 'The Zeus Power International team', sizes: '(min-width: 1360px) 1312px, 100vw' };
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: '/images/team_pose_2.webp', width: 2048, height: 1162 });
  const {
    props: { srcSet: tall, src, alt, ...rest },
  } = getImageProps({ ...common, src: '/images/team.webp', width: 1463, height: 2048 });

  return (
    <picture data-widen-img className="block h-full w-full">
      <source media="(min-width: 768px)" srcSet={wide} />
      <source srcSet={tall} />
      <img {...rest} src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-[50%_30%]" />
    </picture>
  );
}

export default function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-title" className="py-[clamp(80px,10vw,144px)]">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="team-title" data-reveal="words" className="h-section max-w-[16ch] lg:col-span-7">
            <Words>50+ technicians, led by engineers.</Words>
          </h2>
          <p data-reveal="fade" className="max-w-[46ch] text-ink-2 lg:col-span-5 lg:col-start-8">
            More than 50 technicians cover electrical, fire protection and air-conditioning work around the clock, led
            by the engineers below.
          </p>
        </div>

        <figure data-widen className="frame mt-[clamp(40px,5vw,64px)] aspect-[4/5] md:aspect-[2048/1000]">
          <CrewPhoto />
        </figure>

        <h3 data-reveal="fade" className="h-sub mt-[clamp(56px,7vw,96px)]">
          Leadership
        </h3>
        <ul data-reveal="stagger" data-each="0.1" className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {leaders.map((m) => (
            <li key={m.name} className="group">
              <div className="frame aspect-[4/5]">
                <Image
                  src={m.image}
                  alt={`${m.honorific} ${m.name}, ${m.role}`}
                  fill
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 text-[1.0625rem] font-semibold leading-tight tracking-[-0.01em]">
                {m.honorific} {m.name}
              </p>
              <p className="mt-1 text-[0.9375rem] leading-snug text-ink-3">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
