"use client";

export function MembershipForm() {
  function handleSubmit(event) {
    event.preventDefault();
    // Supabase kayıt işlemi üyelik sprintinde buraya bağlanacak.
  }

  return (
    <form onSubmit={handleSubmit} className="membership-form">
      <label className="form-field">Ad soyad<input required name="fullName" className="form-input" /></label>
      <label className="form-field">E-posta<input required type="email" name="email" className="form-input" /></label>
      <label className="form-field">Mezuniyet yılı<input required type="number" name="graduationYear" className="form-input" /></label>
      <label className="form-field">Telefon<input required type="tel" name="phone" className="form-input" /></label>
      <label className="form-consent"><input required type="checkbox" name="kvkkConsent" /><span>KVKK aydınlatma metnini okudum ve başvuru verilerimin işlenmesini kabul ediyorum.</span></label>
      <button type="submit" className="button button--primary">Başvuruyu gönder</button>
    </form>
  );
}
