import { AttritionPredictionResponse } from "@/types/hr-analytics";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, TrendingUp, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttritionResultProps {
  result: AttritionPredictionResponse;
}

export function AttritionResult({ result }: AttritionResultProps) {
  const isHighRisk = result.attrition_prediction === 1;
  const probabilityPercent = Math.round(result.attrition_probability * 100);
  const stayPercent = Math.round(result.stay_probability * 100);

  return (
    <div className="animate-scale-in space-y-6">
      {/* Prediction Badge */}
      <div className="flex items-center justify-center">
        <div
          className={cn(
            "flex items-center gap-3 px-6 py-4 rounded-2xl border-2",
            isHighRisk
              ? "bg-destructive/10 border-destructive text-destructive"
              : "bg-success/10 border-success text-success"
          )}
        >
          {isHighRisk ? (
            <TrendingDown className="h-8 w-8" />
          ) : (
            <Shield className="h-8 w-8" />
          )}
          <div>
            <p className="text-sm font-medium opacity-80">Prediction</p>
            <p className="text-xl font-bold">
              {isHighRisk ? "High Risk (Will Leave)" : "Stable (Will Stay)"}
            </p>
          </div>
        </div>
      </div>

      {/* Probability Meter */}
      <div className="space-y-4 p-6 bg-muted/50 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Probability of Leaving
          </span>
          <span className="text-2xl font-bold font-mono">{probabilityPercent}%</span>
        </div>
        
        <div className="relative h-4 rounded-full overflow-hidden gradient-risk">
          <div
            className="absolute inset-y-0 right-0 bg-muted transition-all duration-1000"
            style={{ width: `${100 - probabilityPercent}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-foreground rounded-full shadow-lg transition-all duration-1000"
            style={{ left: `calc(${probabilityPercent}% - 2px)` }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Stay</span>
          <span>Leave</span>
        </div>
      </div>

      {/* Stay Confidence */}
      <div className="flex items-center justify-between p-4 bg-card border rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/20">
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Confidence to Stay</p>
            <p className="text-lg font-semibold">{stayPercent}%</p>
          </div>
        </div>
        <Badge variant={stayPercent > 50 ? "default" : "secondary"}>
          {stayPercent > 70 ? "High" : stayPercent > 40 ? "Medium" : "Low"}
        </Badge>
      </div>
    </div>
  );
}
