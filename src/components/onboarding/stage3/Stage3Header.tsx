import { CardTitle, CardDescription } from "@heuvera/components/ui/card";

export default function Stage3Header({ stage }: { stage: number }) {
  return (
    <div>
      {stage === 3 && (
        <>
          <CardTitle>Housing Preferences</CardTitle>
          <CardDescription>
            Share your ideal living situation and requirements.
          </CardDescription>
        </>
      )}{" "}
    </div>
  );
}
