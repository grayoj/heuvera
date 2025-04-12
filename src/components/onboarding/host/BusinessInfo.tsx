import { Input } from "@heuvera/components/ui/input";
import { Label } from "@heuvera/components/ui/label";
import { Switch } from "@heuvera/components/ui/switch";
import { Textarea } from "@heuvera/components/ui/textarea";
import { FormInfo } from "./FormData";
import StepHeading from "./StepHeading";

export default function BusinessInfo({
  step,
  handleInputChange,
  handleFileUpload,
  formData,
  handleSwitchChange,
}: {
  step: number;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileUpload: (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  formData: FormInfo;
  handleSwitchChange: (checked: boolean) => void;
}) {
  return (
    <div>
      {step === 2 && (
        <div className="space-y-6">
          <StepHeading>Business Information</StepHeading>

          <div className="flex items-center space-x-2 mb-6">
            <Switch
              id="asBusiness"
              checked={formData.asBusiness}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="asBusiness">Register as a business</Label>
          </div>

          {formData.asBusiness && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your Business Name"
                />
              </div>

              <div>
                <Label htmlFor="businessLogo">Business Logo</Label>
                <div className="flex items-center mt-1">
                  <Input
                    type="file"
                    id="businessLogo"
                    value={formData.businessName}
                    onChange={(e) => handleFileUpload("businessLogo", e)}
                  />
                  {formData.businessLogo && (
                    <span className="ml-2 text-sm text-gray-600">
                      {formData.businessLogo}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="businessRegNumber">
                  Business Registration Number
                </Label>
                <Input
                  id="businessRegNumber"
                  name="businessRegNumber"
                  value={formData.businessRegNumber}
                  onChange={handleInputChange}
                  placeholder="Registration Number"
                />
              </div>

              <div>
                <Label htmlFor="businessAddress">Business Address</Label>
                <Textarea
                  id="businessAddress"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  placeholder="Full Business Address"
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
