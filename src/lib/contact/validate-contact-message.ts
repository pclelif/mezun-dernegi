export type ContactPayload = {
  name: string;
  email: string;
  subject: string | null;
  message: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

/** HTML / XSS enjeksiyonuna karşı düz metin kaçışı. */
export function escapePlainText(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\//g, "&#47;");
}

/** Etiketleri tamamen temizler; kalan metni trim eder. */
export function stripHtmlTags(input: string): string {
  return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

export function validateAndSanitizeContactInput(raw: unknown): ContactValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Geçersiz istek gövdesi." };
  }

  const body = raw as Record<string, unknown>;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subjectRaw = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Ad soyad, e-posta ve mesaj alanları zorunludur." };
  }

  if (name.length > 50) {
    return { ok: false, error: "İsim en fazla 50 karakter olabilir." };
  }

  if (email.length > 100) {
    return { ok: false, error: "E-posta en fazla 100 karakter olabilir." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Geçerli bir e-posta adresi giriniz." };
  }

  if (subjectRaw.length > 100) {
    return { ok: false, error: "Konu en fazla 100 karakter olabilir." };
  }

  if (message.length > 500) {
    return { ok: false, error: "Mesaj en fazla 500 karakter olabilir." };
  }

  const sanitizedName = escapePlainText(stripHtmlTags(name));
  const sanitizedEmail = escapePlainText(stripHtmlTags(email));
  const sanitizedSubject = subjectRaw
    ? escapePlainText(stripHtmlTags(subjectRaw))
    : null;
  const sanitizedMessage = escapePlainText(stripHtmlTags(message));

  if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
    return { ok: false, error: "Geçersiz karakterler nedeniyle mesaj kaydedilemedi." };
  }

  if (sanitizedName.length > 50 || sanitizedEmail.length > 100 || sanitizedMessage.length > 500) {
    return { ok: false, error: "Mesaj alanları izin verilen uzunluğu aşıyor." };
  }

  if (sanitizedSubject && sanitizedSubject.length > 100) {
    return { ok: false, error: "Konu en fazla 100 karakter olabilir." };
  }

  return {
    ok: true,
    data: {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
    },
  };
}
