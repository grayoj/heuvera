import { Input } from "@heuvera/components/ui/input";
import { Label } from "@heuvera/components/ui/label";
import { Textarea } from "@heuvera/components/ui/textarea";
import { FormInfo } from "./FormData";
import StepHeading from "./StepHeading";

export default function PersonalInfo({
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
      {step === 1 && (
        <div className="space-y-6">
            <StepHeading>
                Personal Information
            </StepHeading>

          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+234 816 152 2624"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="governmentId">Government ID Number</Label>
              <Input
                id="governmentId"
                name="governmentId"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="NIN"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
