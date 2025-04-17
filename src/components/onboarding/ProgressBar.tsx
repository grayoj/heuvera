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
      <Progress value={progress} className="h-1 mb-2 text-[#7b4f3a] dark:text-[#8B5F4D]" />
      <div className="flex justify-between text-sm text-[#A7A7A7]">
        <span>Step {stage} of 4</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
}
