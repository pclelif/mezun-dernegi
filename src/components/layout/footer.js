import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-site site-footer__grid">
        <div><p className="site-footer__heading">Hızlı bağlantılar</p><div className="site-footer__links"><Link href="/kurumsal/hakkimizda">Hakkımızda</Link><Link href="/uyelik">Üyelik</Link><Link href="/iletisim">İletişim</Link></div></div>
        <div className="site-footer__copyright">© {new Date().getFullYear()} KAAFL Mezunlar Derneği</div>
      </div>
    </footer>
  );
}
