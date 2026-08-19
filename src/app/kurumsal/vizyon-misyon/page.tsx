import { ContentPage } from "@/components/shared/content-page";
import { contentSections } from "@/config/content";
import { getSiteContent } from "@/lib/supabase/queries";
export const dynamic = "force-dynamic";

const DEFAULT_VISION = "Okulumuzla bağını sürdüren, mezunlarımız arasında dayanışmanın güçlendiği ve iletişimin güçlü olduğu bir mezun topluluğu oluşturmak.";
const DEFAULT_MISSION = "Bu doğrultuda mezunlarımızı bir araya getirmek, iletişim ve dayanışmayı desteklemek.";

export default async function Page() {
  const content = await getSiteContent("hakkimizda", contentSections.hakkimizda.defaults);

  const oldVisions = [
    "Mezunlarımız arasındaki iletişimi ve dayanışmayı güçlendiren, okulumuza ve mezun topluluğumuza değer katan sürdürülebilir bir dernek olmak.",
    "Okuluyla bağını sürdüren, mezunları arasında güçlü ilişkiler kuran ve aktif bir mezun ağına sahip bir topluluk olmak."
  ];
  const oldMissions = [
    "Mezunlarımızı ortak bir platformda buluşturmak, sosyal ve mesleki iletişimi desteklemek ve okulumuzla olan bağı güçlendirmek.",
    "Mezunlarımızı bir araya getirmek, iletişim ve dayanışmayı geliştirmek, mezunlar ile okul arasındaki etkileşimi desteklemek."
  ];

  const visionText = (content.vision && !oldVisions.includes(content.vision.trim()))
    ? content.vision
    : DEFAULT_VISION;

  const missionText = (content.mission && !oldMissions.includes(content.mission.trim()))
    ? content.mission
    : DEFAULT_MISSION;

  return (
    <ContentPage
      eyebrow="YOL HARİTAMIZ"
      title="Vizyonumuz ve Misyonumuz"
      description="Vizyonumuz geleceğe bakışımızı, misyonumuz ise bu doğrultuda üstlendiğimiz sorumlulukları ifade eder."
      titleClassName="panel-title--compact"
      descriptionClassName="panel-copy--compact"
    >
      <div className="grid max-w-5xl gap-6 md:grid-cols-2">
        <section className="border-l-2 border-red-600 pl-5">
          <h2 className="text-xl font-semibold leading-7 tracking-tight text-zinc-950">Vizyonumuz</h2>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            {visionText}
          </p>
        </section>
        <section className="border-l-2 border-red-600 pl-5">
          <h2 className="text-xl font-semibold leading-7 tracking-tight text-zinc-950">Misyonumuz</h2>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            {missionText}
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
