import {
  propertyTypes,
  rentRanges,
  stayDurations,
} from "@heuvera/components/data/OnbaordingData";
import { Badge } from "@heuvera/components/ui/badge";
import { Checkbox } from "@heuvera/components/ui/checkbox";
import { Label } from "@heuvera/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@heuvera/components/ui/select";
import { FormInfo } from "../Formdata";

interface HousingProps {
  stage: number;
  formData: FormInfo;
  handleInputChange: (field: string, value: boolean | string) => void;
  toggleArrayValue: (field: string, value: string) => void;
}

export default function Housing({
  stage,
  formData,
  handleInputChange,
  toggleArrayValue,
}: HousingProps) {
  if (stage !== 3) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="preferredRentRange">
          Preferred Rent Range <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.preferredRentRange}
          onValueChange={(value) =>
            handleInputChange("preferredRentRange", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your preferred monthly rent" />
          </SelectTrigger>
          <SelectContent>
            {rentRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>
          Preferred Property Types (Select all that apply){" "}
          <span className="text-red-500">*</span>
        </Label>
        <div className="flex flex-wrap mt-2 gap-2">
          {propertyTypes.map((type) => (
            <div key={type.id}>
              <Badge
                variant={
                  formData.preferredPropertyTypes.includes(type.id)
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer mr-2 mb-2"
                onClick={() =>
                  toggleArrayValue("preferredPropertyTypes", type.id)
                }
              >
                {type.label}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stayDuration">
          Stay Duration <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.stayDuration}
          onValueChange={(value) => handleInputChange("stayDuration", value)}
        >
          {/* <SelectTrigger
            className={errors.stayDuration ? "border-red-500" : ""}
          >
            <SelectValue placeholder="How long do you plan to stay?" />
          </SelectTrigger> */}
          <SelectContent>
            {stayDurations.map((duration) => (
              <SelectItem key={duration} value={duration}>
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasPets"
            checked={formData.hasPets}
            onCheckedChange={(checked) =>
              handleInputChange("hasPets", checked === true)
            }
          />
          <Label htmlFor="hasPets">Do you have pets?</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasChildren"
            checked={formData.hasChildren}
            onCheckedChange={(checked) =>
              handleInputChange("hasChildren", checked === true)
            }
          />
          <Label htmlFor="hasChildren">Do you have children?</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="smoking"
            checked={formData.smoking}
            onCheckedChange={(checked) =>
              handleInputChange("smoking", checked === true)
            }
          />
          <Label htmlFor="smoking">Do you smoke?</Label>
        </div>
      </div>
    </div>
  );
}
