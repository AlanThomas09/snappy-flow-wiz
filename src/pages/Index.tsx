import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Bell } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize with sample data if empty
    const drivers = localStorage.getItem("authorizedDrivers");
    if (!drivers) {
      localStorage.setItem(
        "authorizedDrivers",
        JSON.stringify([
          { id: "1", nickname: "Wife" },
          { id: "2", nickname: "Shamsu Bala" },
        ])
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar Spacing */}
      <div className="h-11" />

      {/* Content */}
      <main className="flex-1 px-6 pt-12">
        <div className="max-w-md mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Vehicle Security
            </h1>
            <p className="text-base text-muted-foreground">
              Manage authorized drivers and security alerts
            </p>
          </div>

          {/* Action Cards */}
          <div className="space-y-4 pt-8">
            <Button
              onClick={() => navigate("/alert")}
              className="w-full h-24 text-lg font-medium rounded-2xl bg-foreground text-background hover:bg-foreground/90 flex items-center justify-between px-6"
            >
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6" />
                <span>View Alert</span>
              </div>
            </Button>

            <Button
              onClick={() => navigate("/drivers")}
              className="w-full h-24 text-lg font-medium rounded-2xl bg-accent text-foreground hover:bg-accent/80 flex items-center justify-between px-6"
            >
              <div className="flex items-center gap-4">
                <Users className="h-6 w-6" />
                <span>Authorized Drivers</span>
              </div>
            </Button>
          </div>
        </div>
      </main>

      {/* iOS Home Indicator */}
      <div className="h-8 flex items-center justify-center pb-2">
        <div className="w-32 h-1 bg-foreground/30 rounded-full" />
      </div>
    </div>
  );
};

export default Index;
