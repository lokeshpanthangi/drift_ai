import { UseFormReturn, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GENDER_OPTIONS,
  EDUCATION_OPTIONS,
  DEPARTMENT_OPTIONS,
  JOB_ROLE_OPTIONS,
  OVERTIME_OPTIONS,
  PERFORMANCE_RATING_OPTIONS,
} from "@/types/hr-analytics";
import { cn } from "@/lib/utils";

interface EmployeeFormProps {
  form: UseFormReturn<any>;
  showLeakyFields?: boolean;
}

export function EmployeeForm({ form, showLeakyFields = false }: EmployeeFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Age */}
      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={18}
                max={65}
                placeholder="e.g. 30"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Gender */}
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {GENDER_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Education */}
      <FormField
        control={form.control}
        name="education"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Education</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {EDUCATION_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Department */}
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {DEPARTMENT_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Job Role */}
      <FormField
        control={form.control}
        name="job_role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Role</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select job role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {JOB_ROLE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Monthly Income */}
      <FormField
        control={form.control}
        name="monthly_income"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Income ($)</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  min={1000}
                  step={100}
                  className="pl-7"
                  placeholder="e.g. 5000"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Years at Company */}
      <FormField
        control={form.control}
        name="years_at_company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years at Company</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                max={40}
                placeholder="e.g. 5"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Promotions */}
      <FormField
        control={form.control}
        name="promotions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Num. of Promotions</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                placeholder="e.g. 2"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Overtime */}
      <FormField
        control={form.control}
        name="overtime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Overtime</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select overtime status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {OVERTIME_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Performance Rating */}
      <FormField
        control={form.control}
        name="performance_rating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Performance Rating</FormLabel>
            <Select
              onValueChange={(val) => field.onChange(parseInt(val))}
              value={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PERFORMANCE_RATING_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Leaky Fields */}
      {showLeakyFields && (
        <>
          <FormField
            control={form.control}
            name="attrition_copy"
            render={({ field }) => (
              <FormItem className={cn("p-4 -m-2 rounded-lg", "bg-leaky-bg border border-leaky-border")}>
                <FormLabel className="text-destructive font-medium">
                  Future Result Known? (Leaky)
                </FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(parseInt(val))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="border-leaky-border">
                      <SelectValue placeholder="Select value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0 - No</SelectItem>
                    <SelectItem value="1">1 - Yes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="target_leakage_feature"
            render={({ field }) => (
              <FormItem className={cn("p-4 -m-2 rounded-lg", "bg-leaky-bg border border-leaky-border")}>
                <FormLabel className="text-destructive font-medium">
                  Leakage Parameter (Leaky)
                </FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(parseInt(val))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="border-leaky-border">
                      <SelectValue placeholder="Select value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
}
