import { ChevronLeft, Plus, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AlertPage = () => {
  const navigate = useNavigate();

  const actionItems = [
    {
      label: "Add Authorized Driver",
      icon: Plus,
      onClick: () => navigate("/add-driver"),
      showChevron: false,
    },
    {
      label: "Report Stolen Vehicle",
      icon: ChevronRight,
      onClick: () => {
        console.log("Report stolen vehicle");
      },
      showChevron: true,
    },
    {
      label: "Dismiss",
      icon: X,
      onClick: () => {
        console.log("Dismiss alert");
      },
      showChevron: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar Spacing */}
      <div className="h-11" />
      
      {/* Header */}
      <header className="px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -ml-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Unknown Driver Detected</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 pt-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Occurence at 6:05pm
          </h2>
          <p className="text-base text-foreground">
            Please choose an action item below.
          </p>
        </div>

        {/* Action Items */}
        <div className="mt-8 space-y-4">
          {actionItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between px-5 py-4 bg-accent rounded-xl hover:bg-accent/80 active:scale-[0.98] transition-all"
            >
              <span className="text-base font-medium text-foreground">
                {item.label}
              </span>
              {item.showChevron ? (
                <ChevronRight className="h-5 w-5 text-foreground" />
              ) : (
                <item.icon className="h-5 w-5 text-foreground" />
              )}
            </button>
          ))}
        </div>
      </main>

      {/* iOS Home Indicator */}
      <div className="h-8 flex items-center justify-center pb-2">
        <div className="w-32 h-1 bg-foreground/30 rounded-full" />
      </div>
    </div>
  );
};

export default AlertPage;
