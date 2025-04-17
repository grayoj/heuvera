import { Progress } from "../ui/progress";

export default function ProgressBar({
  progress,
  stage,
}: {
  progress: number;
  stage: number;
}) {
  return (
    <div className="mb-8">
      <Progress value={progress} className="h-2 mb-2 text-[#7b4f3a]" />
      <div className="flex justify-between text-sm text-gray-500">
        <span>Step {stage} of 4</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
}
