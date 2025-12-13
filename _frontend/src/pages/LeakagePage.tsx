import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { LeakageResult } from "@/components/results/LeakageResult";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { LeakagePredictionResponse, LeakyFormData } from "@/types/hr-analytics";
import { Loader2, AlertTriangle, CheckCircle2, Bug, Sparkles } from "lucide-react";
import { predictBrokenModel, predictFixedModel } from "@/services/api";

const baseSchema = {
  age: z.number().min(18).max(65),
  gender: z.string().min(1),
  education: z.string().min(1),
  department: z.string().min(1),
  job_role: z.string().min(1),
  monthly_income: z.number().min(1000),
  years_at_company: z.number().min(0).max(40),
  promotions: z.number().min(0),
  overtime: z.string().min(1),
  performance_rating: z.number().min(1).max(4),
};

const brokenFormSchema = z.object({
  ...baseSchema,
  attrition_copy: z.number().min(0).max(1),
  target_leakage_feature: z.number().min(0).max(1),
});

const fixedFormSchema = z.object(baseSchema);

type ModelTab = "broken" | "fixed";

export default function LeakagePage() {
  const [activeTab, setActiveTab] = useState<ModelTab>("broken");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LeakagePredictionResponse | null>(null);
  const { toast } = useToast();

  const brokenForm = useForm<LeakyFormData>({
    resolver: zodResolver(brokenFormSchema),
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
      attrition_copy: 0,
      target_leakage_feature: 0,
    },
  });

  const fixedForm = useForm<LeakyFormData>({
    resolver: zodResolver(fixedFormSchema),
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
      attrition_copy: 0,
      target_leakage_feature: 0,
    },
  });

  const onSubmit = async (data: LeakyFormData, isBroken: boolean) => {
    setIsLoading(true);
    setResult(null);

    try {
      let result: LeakagePredictionResponse;

      if (isBroken) {
        // Broken model includes leaky features - data already in correct format
        result = await predictBrokenModel(data);
      } else {
        // Fixed model uses only legitimate features - data already in correct format
        result = await predictFixedModel(data);
      }
      
      setResult(result);
      
      toast({
        title: "Prediction Complete",
        description: `Result from ${isBroken ? "Broken" : "Fixed"} model.`,
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
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Data Leakage Experiment
            </h1>
          </div>
          <p className="text-muted-foreground ml-12">
            Demonstrate how data leakage can artificially inflate model performance and lead to unreliable predictions.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as ModelTab); setResult(null); }}>
          <TabsList className="grid w-full grid-cols-2 h-14">
            <TabsTrigger value="broken" className="flex items-center gap-2 h-12">
              <Bug className="h-5 w-5" />
              <span>Broken Model</span>
            </TabsTrigger>
            <TabsTrigger value="fixed" className="flex items-center gap-2 h-12">
              <Sparkles className="h-5 w-5" />
              <span>Fixed Model</span>
            </TabsTrigger>
          </TabsList>

          {/* Broken Model Tab */}
          <TabsContent value="broken" className="space-y-6 mt-6">
            <Alert variant="destructive" className="border-warning bg-warning/10">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <AlertTitle className="text-warning">Data Leakage Warning</AlertTitle>
              <AlertDescription className="text-warning/80">
                This model contains leaky features that expose the target variable during training, 
                resulting in unrealistically high accuracy but poor real-world performance.
              </AlertDescription>
            </Alert>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Employee Information (with Leaky Features)</CardTitle>
                <CardDescription>
                  Notice the red-highlighted fields that cause data leakage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...brokenForm}>
                  <form onSubmit={brokenForm.handleSubmit((data) => onSubmit(data, true))} className="space-y-8">
                    <EmployeeForm form={brokenForm} showLeakyFields={true} />
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-warning hover:bg-warning/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Bug className="mr-2 h-5 w-5" />
                          Run Broken Model
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fixed Model Tab */}
          <TabsContent value="fixed" className="space-y-6 mt-6">
            <Alert className="border-primary bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <AlertTitle className="text-primary">Cleaned Model</AlertTitle>
              <AlertDescription className="text-primary/80">
                This model has been properly cleaned of data leakage features 
                and provides reliable predictions based on legitimate employee data.
              </AlertDescription>
            </Alert>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Employee Information (Clean)</CardTitle>
                <CardDescription>
                  Standard employee features without data leakage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...fixedForm}>
                  <form onSubmit={fixedForm.handleSubmit((data) => onSubmit(data, false))} className="space-y-8">
                    <EmployeeForm form={fixedForm} showLeakyFields={false} />
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Run Fixed Model
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Results */}
        {result && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Prediction Result</CardTitle>
              <CardDescription>
                Output from the {activeTab === "broken" ? "broken" : "fixed"} model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeakageResult result={result} modelType={activeTab} />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
