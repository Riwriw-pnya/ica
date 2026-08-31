export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="landing-page">
      {children}
    </div>
  );
}