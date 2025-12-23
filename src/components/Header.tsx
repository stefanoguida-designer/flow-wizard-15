import { Clover } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-6 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-foreground/10 rounded-lg">
            <Clover className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">OGCIO Form Management Platform</h1>
            <p className="text-sm opacity-80">User Flow Documentation</p>
          </div>
        </div>
      </div>
    </header>
  );
}
