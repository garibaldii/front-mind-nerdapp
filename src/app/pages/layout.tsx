import { ArticleProvider } from "@/context/ArticleContext";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ArticleProvider>
      <div className="p-10">
        {children}
      </div>
    </ArticleProvider>
  );
}
