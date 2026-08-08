import Link from "next/link";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { IbanCopyButton } from "./iban-copy-button";
import styles from "./page.module.css";

const steps = [
  {
    number: "1",
    title: "Üyelik formunu doldurun",
    description: "Aşağıdaki üyelik formunu eksiksiz olarak doldurarak başvurunuzu oluşturun.",
    action: true,
  },
  {
    number: "2",
    title: "Bilgilerinizi kontrol edin",
    description: "Başvuru formunda yer alan kişisel ve mezuniyet bilgilerinizi göndermeden önce kontrol ediniz.",
  },
  {
    number: "3",
    title: "Başvurunuzu tamamlayın",
    description: "Başvurunuz dernek yönetimi tarafından incelendikten sonra üyelik durumunuzla ilgili bilgilendirme yapılacaktır.",
  },
];

const rights = [
  "Genel kurul toplantılarına katılma ve oy kullanma",
  "Dernek faaliyetlerinden ve etkinliklerinden yararlanma",
  "Dernek çalışmalarına katkıda bulunma",
  "Tüzükte belirtilen diğer üye haklarından yararlanma",
];

const faqItems = [
  {
    id: "kimler-uye-olabilir",
    question: "Kimler derneğe üye olabilir?",
    answer: "[Dernek tüzüğünde belirtilen üyelik koşulları.]",
  },
  {
    id: "basvuru-suresi",
    question: "Üyelik başvurusu ne kadar sürede sonuçlanır?",
    answer: "[Dernek tarafından belirlenecek süre.]",
  },
  {
    id: "aidat-tutari",
    question: "Üyelik aidatı ne kadar?",
    answer: "Yıllık üyelik aidatı [Tutar] TL’dir.",
  },
  {
    id: "basvuru-durumu",
    question: "Başvurumun durumunu nasıl öğrenebilirim?",
    answer: "Başvurunuz değerlendirildikten sonra kayıtlı iletişim bilgileriniz üzerinden bilgilendirme yapılacaktır.",
  },
];

export default function Page() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.container}>
          <h1>Üyelik işlemleri</h1>
          <p>Derneğimize üye olmak için aşağıdaki adımları takip edebilirsiniz.</p>
        </div>
      </header>

      <div className={styles.container}>
        <ol className={styles.steps} aria-label="Üyelik başvuru adımları">
          {steps.map((step) => (
            <li className={styles.step} key={step.number}>
              <span className={styles.stepNumber} aria-hidden="true">{step.number}</span>
              <div className={styles.stepContent}>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
                {step.action ? (
                  <Link className="button button--primary" href="/uyelik/basvuru">
                    Üyelik Formuna Git
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <section className={styles.section} aria-labelledby="membership-rights-title">
          <h2 id="membership-rights-title">Üyelik hakları</h2>
          <p className={styles.sectionIntro}>Dernek üyelerinin sahip olduğu haklar ve üyelik koşulları aşağıda belirtilmiştir.</p>
          <ul className={styles.rightsList}>
            {rights.map((right) => <li key={right}>{right}</li>)}
          </ul>
        </section>

        <section className={`${styles.section} ${styles.feePanel}`} aria-labelledby="membership-fee-title">
          <h2 id="membership-fee-title">Üyelik aidatı</h2>
          <p className={styles.feeAmount}>Yıllık üyelik aidatı: <strong>[Tutar] TL</strong></p>
          <dl className={styles.bankDetails}>
            <div><dt>Hesap adı</dt><dd>Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği</dd></div>
            <div><dt>Banka</dt><dd>[Banka Adı]</dd></div>
            <div className={styles.ibanRow}>
              <dt>IBAN</dt>
              <dd><span>[IBAN]</span><IbanCopyButton value="[IBAN]" /></dd>
            </div>
            <div><dt>Açıklama</dt><dd>[Ödeme açıklaması]</dd></div>
          </dl>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="membership-faq-title">
          <h2 id="membership-faq-title">Sıkça sorulanlar</h2>
          <FAQAccordion items={faqItems} />
        </section>
      </div>
    </div>
  );
}
