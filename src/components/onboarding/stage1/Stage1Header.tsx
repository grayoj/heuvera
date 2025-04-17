import { CardDescription, CardTitle } from "@heuvera/components/ui/card";

export default function Stage1Header({ stage }: { stage: number }) {
  return (
    <div>
      {stage === 1 && (
        <>
          <CardTitle>Location Details</CardTitle>
          <CardDescription>
            Tell us where you&apos;re based current.
          </CardDescription>
        </>
      )}
    </div>
  );
}
