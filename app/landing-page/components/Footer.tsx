export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div>
          <div className="footer-brand">
            <div className="brand-logo">
              ICA
            </div>

            <span>Indonesian Cat Association</span>
          </div>

          <p>
            Organisasi dan komunitas pecinta kucing
            di Indonesia.
          </p>
        </div>

        <div className="footer-links">

          <div>
            <h4>Navigasi</h4>
            <a href="#tentang">Tentang</a>
            <a href="#berita">Berita</a>
            <a href="#event">Event</a>
          </div>

          <div>
            <h4>Keanggotaan</h4>
            <a href="/register">Daftar</a>
            <a href="/login">Masuk</a>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Indonesian Cat Association. All rights reserved.
      </div>

    </footer>
  );
}