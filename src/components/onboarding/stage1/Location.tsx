import { Input } from "@heuvera/components/ui/input";
import { Label } from "@heuvera/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@heuvera/components/ui/select";
import { FormInfo } from "../Formdata";

export default function Location({
  stage,
  handleInputChange,
  formData,
}: {
  stage: number;
  handleInputChange: (field: string, value: string) => void;
  formData: FormInfo;
}) {
  return (
    <div>
      {stage === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">
              Country <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">
              State/Province <span className="text-red-500">*</span>
            </Label>
            <Input
              id="state"
              placeholder="Enter your state or province"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
