import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { ContentPage } from "@/components/shared/content-page";
import { contentSections } from "@/config/content";
import { getSiteContent } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getSiteContent("iletisim", contentSections.iletisim.defaults);
  const mapQuery = content.map_location || content.address;
  const mapEmbedUrl = mapQuery ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed` : "";
  const mapLink = content.map_url || (mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}` : "");
  
  type IconComp = ComponentType<{ className?: string }>;

  const contactRows = [
    content.address ? { label: "Adres", value: content.address, href: mapLink, Icon: MapPin as IconComp } : null,
    content.phone ? { label: "Telefon", value: content.phone, href: `tel:${content.phone.replace(/\s/g, "")}`, Icon: Phone as IconComp } : null,
    content.email ? { label: "E-posta", value: content.email, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(content.email)}`, Icon: Mail as IconComp } : null,
    content.secondary_email ? { label: "E-posta", value: content.secondary_email, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(content.secondary_email)}`, Icon: Mail as IconComp } : null,
    content.instagram_url ? { label: "Instagram", value: "Instagram hesabımız", href: content.instagram_url, Icon: InstagramIcon as IconComp } : null,
    content.linkedin_url ? { label: "LinkedIn", value: "LinkedIn hesabımız", href: content.linkedin_url, Icon: LinkedinIcon as IconComp } : null,
  ].filter((item): item is { label: string; value: string; href: string; Icon: IconComp } => item !== null);

  return (
    <ContentPage
      eyebrow="BAĞIMIZ HEP GÜÇLÜ KALSIN"
      title="İletişim"
      description="Sorularınız, görüşleriniz ve önerileriniz için bize ulaşabilirsiniz."
      titleClassName="panel-title--compact"
      descriptionClassName="panel-copy--compact"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(19rem,0.85fr)_minmax(0,1.25fr)]">
        <section className="flex rounded-2xl border border-zinc-200 border-l-4 border-l-[var(--color-accent)] bg-[var(--color-white)] p-6 shadow-sm sm:p-8 lg:items-center lg:p-8" aria-label="İletişim bilgileri">
          <div className="w-full space-y-7">
            {contactRows.length ? (
              contactRows.map(({ label, value, href, Icon }, index) => (
                <div key={`${label}-${index}`} className="flex items-start gap-4">
                  <Icon className="mt-0.5 size-6 shrink-0 text-[var(--color-accent)]" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-1 block touch-manipulation break-words whitespace-pre-line text-base font-normal leading-7 text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] active:text-[var(--color-ink)]"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 whitespace-pre-line text-base leading-7 text-[var(--color-muted)]">{value}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[var(--color-muted)]">İletişim bilgileri yakında eklenecek.</p>
            )}
          </div>
        </section>

        <section className="relative min-h-80 overflow-hidden rounded-2xl border border-zinc-200 bg-[var(--color-surface)] shadow-sm" aria-label="Harita">
          {mapEmbedUrl ? (
            <>
              <iframe
                src={mapEmbedUrl}
                title="Dernek konumu"
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {mapLink ? (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 inline-flex touch-manipulation items-center gap-2 rounded-lg border border-zinc-200 bg-[var(--color-white)] px-4 py-2.5 text-sm font-semibold text-[var(--color-ink)] shadow-lg transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:border-[var(--color-accent)] active:text-[var(--color-accent)]"
                >
                  Google Maps’te Aç
                  <ExternalLink className="size-4 text-[var(--color-accent)]" />
                </a>
              ) : null}
            </>
          ) : (
            <div className="grid min-h-80 place-items-center p-8 text-center text-[var(--color-muted)]">
              <div>
                <MapPin className="mx-auto size-8 text-[var(--color-accent)]" />
                <p className="mt-3">Harita konumu admin panelinden eklenebilir.</p>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="mt-12" aria-labelledby="contact-form-title">
        <div className="mb-6">
          <h2 id="contact-form-title" className="text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">İletişim Formu</h2>
          <p className="mt-2 text-slate-600">Formu doldurduğunuzda mesajınız doğrudan dernek yönetimine ulaşır.</p>
        </div>
        <ContactForm />
      </section>
    </ContentPage>
  );
}
