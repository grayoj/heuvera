import { CardTitle, CardDescription } from "@heuvera/components/ui/card";

export default function Stage2Header({ stage }: { stage: number }) {
  return (
    <div>
      {stage === 2 && (
        <>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Help us understand your background and interests.
          </CardDescription>
        </>
      )}
    </div>
  );
}
