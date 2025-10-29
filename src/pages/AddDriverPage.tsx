import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const AddDriverPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      toast.error("Please enter a nickname");
      return;
    }

    // Get existing drivers from localStorage
    const existingDrivers = JSON.parse(
      localStorage.getItem("authorizedDrivers") || "[]"
    );

    // Add new driver
    const newDriver = {
      id: Date.now().toString(),
      nickname: nickname.trim(),
    };

    localStorage.setItem(
      "authorizedDrivers",
      JSON.stringify([...existingDrivers, newDriver])
    );

    toast.success("Driver added successfully");
    navigate("/drivers");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar Spacing */}
      <div className="h-11" />

      {/* Content */}
      <main className="flex-1 px-6">
        <div className="pt-6 space-y-2">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-bold text-foreground">
            Add Authorized Driver
          </h1>
          <p className="text-base text-muted-foreground">
            Enter authorized driver information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="space-y-2">
            <Label
              htmlFor="nickname"
              className="text-xs text-muted-foreground font-normal"
            >
              Nickname
            </Label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Shamsu Bala"
              className="border-0 border-b border-border rounded-none px-0 text-base focus-visible:ring-0 focus-visible:border-foreground bg-transparent"
            />
          </div>
        </form>
      </main>

      {/* Bottom Button */}
      <div className="px-6 pb-8">
        <Button
          onClick={handleSubmit}
          className="w-full h-14 text-base font-medium rounded-full bg-foreground text-background hover:bg-foreground/90"
        >
          Add Authorized Driver
        </Button>
      </div>

      {/* iOS Home Indicator */}
      <div className="h-8 flex items-center justify-center pb-2">
        <div className="w-32 h-1 bg-foreground/30 rounded-full" />
      </div>
    </div>
  );
};

export default AddDriverPage;
