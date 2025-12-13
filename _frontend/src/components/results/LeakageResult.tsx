import { LeakagePredictionResponse } from "@/types/hr-analytics";
import { cn } from "@/lib/utils";
import { Brain, CheckCircle, XCircle } from "lucide-react";

interface LeakageResultProps {
  result: LeakagePredictionResponse;
  modelType: "broken" | "fixed";
}

export function LeakageResult({ result, modelType }: LeakageResultProps) {
  const prediction = result.prediction[0];
  const willLeave = prediction === 1;

  return (
    <div className="animate-scale-in">
      <div
        className={cn(
          "flex items-center gap-4 p-6 rounded-xl border-2",
          modelType === "broken"
            ? "bg-warning/5 border-warning/30"
            : "bg-primary/5 border-primary/30"
        )}
      >
        <div
          className={cn(
            "p-3 rounded-xl",
            modelType === "broken" ? "bg-warning/20" : "bg-primary/20"
          )}
        >
          <Brain
            className={cn(
              "h-8 w-8",
              modelType === "broken" ? "text-warning" : "text-primary"
            )}
          />
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">
            {modelType === "broken" ? "Broken Model" : "Fixed Model"} Prediction
          </p>
          <div className="flex items-center gap-2">
            {willLeave ? (
              <>
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="text-lg font-semibold text-destructive">
                  Will Leave (1)
                </span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-lg font-semibold text-success">
                  Will Stay (0)
                </span>
              </>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className="text-4xl font-bold font-mono">{prediction}</p>
        </div>
      </div>
    </div>
  );
}
