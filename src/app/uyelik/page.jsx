import { ButtonLink } from "@/components/ui/button-link";
import { ContentPage } from "@/components/shared/content-page";
export default function Page() { return <ContentPage title="Üyelik" description="Mezun ailemize katılın, bağımızı birlikte güçlendirelim."><div className="button-group"><ButtonLink href="/uyelik/sartlar">Üyelik şartları</ButtonLink><ButtonLink href="/uyelik/basvuru" variant="secondary">Başvuru formu</ButtonLink><ButtonLink href="/uyelik/aidat" variant="secondary">Aidat bilgileri</ButtonLink></div></ContentPage>; }
