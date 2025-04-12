import { Progress } from "@heuvera/components/ui/progress";

export default function ProgressBar({
  step,
  totalSteps
}: {
  step: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="text-sm font-medium">
            Step {index + 1}
          </div>
        ))}
      </div>
      <Progress value={(step / totalSteps) * 100} className="h-2" />
    </div>
  );
}
