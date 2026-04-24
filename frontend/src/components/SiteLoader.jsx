import bikanerHeroImage from '../assets/bikaner-hero.png';
import logoImage from '../assets/saat-saath-logo.png';

export default function SiteLoader() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src={bikanerHeroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_38%),linear-gradient(135deg,rgba(0,0,0,0.78),rgba(0,0,0,0.38),rgba(0,0,0,0.82))]" />

      <div className="relative flex min-h-screen items-end px-6 pb-20 md:px-12 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <img
            src={logoImage}
            alt="Saat Saath Arts Foundation"
            className="mb-10 h-16 w-auto brightness-0 invert md:h-20"
          />

          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_240px] md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/65">
                Saat Saath Arts Foundation
              </p>
              <h1 className="max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl lg:text-7xl">
                Loading grants, programmes, and public art initiatives.
              </h1>
            </div>

            <div className="self-end">
              <div className="mb-4 h-px overflow-hidden bg-white/20">
                <div className="site-loader-bar h-full w-1/3 bg-white/90" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/65">
                Preparing content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
