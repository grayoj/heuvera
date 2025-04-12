import { Input } from "@heuvera/components/ui/input";
import { Label } from "@heuvera/components/ui/label";
import { FormInfo } from "./FormData";
import StepHeading from "./StepHeading";

export default function SocialInfo({
  step,
  handleInputChange,
  formData,
}: {
  step: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formData: FormInfo;
}) {
  return (
    <div>
      {step === 3 && (
        <div className="space-y-6">
          <StepHeading>Social Media</StepHeading>

          <div className="space-y-4">
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                name="socialMediaLinks.instagram"
                value={formData.socialMediaLinks.instagram}
                onChange={handleInputChange}
                placeholder="@username"
              />
            </div>

            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                name="socialMediaLinks.twitter"
                value={formData.socialMediaLinks.twitter}
                onChange={handleInputChange}
                placeholder="@username"
              />
            </div>

            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                name="socialMediaLinks.facebook"
                value={formData.socialMediaLinks.facebook}
                onChange={handleInputChange}
                placeholder="Profile URL or username"
              />
            </div>

            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="socialMediaLinks.linkedin"
                value={formData.socialMediaLinks.linkedin}
                onChange={handleInputChange}
                placeholder="Profile URL or username"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
