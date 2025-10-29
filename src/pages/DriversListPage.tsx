import { useState, useEffect } from "react";
import { ChevronLeft, Pencil, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Driver {
  id: string;
  nickname: string;
}

const DriversListPage = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = () => {
    const storedDrivers = JSON.parse(
      localStorage.getItem("authorizedDrivers") || "[]"
    );
    setDrivers(storedDrivers);
  };

  const handleDelete = (id: string, nickname: string) => {
    const updatedDrivers = drivers.filter((driver) => driver.id !== id);
    localStorage.setItem("authorizedDrivers", JSON.stringify(updatedDrivers));
    setDrivers(updatedDrivers);
    toast.success(`${nickname} removed`);
  };

  const handleEdit = (driver: Driver) => {
    toast.info("Edit functionality coming soon");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar Spacing */}
      <div className="h-11" />

      {/* Header */}
      <header className="px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center justify-center relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 absolute left-0"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Authorized Drivers</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {drivers.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground text-base">
              No authorized drivers yet
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-accent/50 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-foreground text-background text-sm font-medium">
                    {getInitials(driver.nickname)}
                  </AvatarFallback>
                </Avatar>

                <span className="flex-1 text-base font-normal text-foreground">
                  {driver.nickname}
                </span>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEdit(driver)}
                  >
                    <Pencil className="h-5 w-5 text-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-destructive hover:bg-destructive/90 rounded-full"
                    onClick={() => handleDelete(driver.id, driver.nickname)}
                  >
                    <Minus className="h-5 w-5 text-destructive-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* iOS Home Indicator */}
      <div className="h-8 flex items-center justify-center pb-2">
        <div className="w-32 h-1 bg-foreground/30 rounded-full" />
      </div>
    </div>
  );
};

export default DriversListPage;
