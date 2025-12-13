import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { AttritionResult } from "@/components/results/AttritionResult";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { AttritionPredictionResponse, EmployeeFormData } from "@/types/hr-analytics";
import { Loader2, TrendingUp, TreeDeciduous, Users } from "lucide-react";
import { predictAttritionLogistic, predictAttritionRandomForest } from "@/services/api";

const formSchema = z.object({
  age: z.number().min(18).max(65),
  gender: z.string().min(1, "Please select gender"),
  education: z.string().min(1, "Please select education level"),
  department: z.string().min(1, "Please select department"),
  job_role: z.string().min(1, "Please select job role"),
  monthly_income: z.number().min(1000),
  years_at_company: z.number().min(0).max(40),
  promotions: z.number().min(0),
  overtime: z.string().min(1, "Please select overtime status"),
  performance_rating: z.number().min(1).max(4),
});

type ModelType = "logistic" | "random_forest";

export default function AttritionPage() {
  const [model, setModel] = useState<ModelType>("logistic");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AttritionPredictionResponse | null>(null);
  const { toast } = useToast();

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      gender: "",
      education: "",
      department: "",
      job_role: "",
      monthly_income: 5000,
      years_at_company: 3,
      promotions: 0,
      overtime: "",
      performance_rating: 3,
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    setIsLoading(true);
    setResult(null);
    
    // Data already in correct format with snake_case field names
    const payload = data;

    try {
      // Call the appropriate API based on selected model
      const result = model === "logistic" 
        ? await predictAttritionLogistic(payload)
        : await predictAttritionRandomForest(payload);
      
      setResult(result);
      
      toast({
        title: "Analysis Complete",
        description: `Prediction generated using ${model === "logistic" ? "Logistic Regression" : "Random Forest"} model.`,
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Employee Attrition Prediction
            </h1>
          </div>
          <p className="text-muted-foreground ml-12">
            Predict whether an employee is likely to leave using machine learning models.
          </p>
        </div>

        {/* Model Selector */}
        <Card className="glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Select Model</CardTitle>
            <CardDescription>
              Choose the machine learning algorithm for prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={model}
              onValueChange={(value) => value && setModel(value as ModelType)}
              className="w-full grid grid-cols-2 gap-2"
            >
              <ToggleGroupItem value="logistic" className="flex items-center gap-2 h-14">
                <TrendingUp className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Logistic Regression</p>
                  <p className="text-xs text-muted-foreground">Linear classifier</p>
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem value="random_forest" className="flex items-center gap-2 h-14">
                <TreeDeciduous className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Random Forest</p>
                  <p className="text-xs text-muted-foreground">Ensemble method</p>
                </div>
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
            <CardDescription>
              Enter the employee details for attrition risk analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <EmployeeForm form={form} />
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Attrition Risk"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>
                Based on {model === "logistic" ? "Logistic Regression" : "Random Forest"} analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AttritionResult result={result} />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
