import { ArticleProvider } from "@/context/ArticleContext";
import { UserProvider } from "@/context/UserContext";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <ArticleProvider>
        <div className="pr-10 pl-10">
          {children}
        </div>
      </ArticleProvider>
    </UserProvider>
  );
}
