import React, { useEffect, useState } from "react";
import { Label } from "@heuvera/components/ui/label";
import { Input } from "@heuvera/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@heuvera/components/ui/select";
import { Checkbox } from "@heuvera/components/ui/checkbox";
import { FormInfo } from "../Formdata";
import {
  incomeRanges,
  interestOptions,
} from "@heuvera/components/data/OnbaordingData";

interface PersonalInfoProps {
  stage: number;
  formData: FormInfo;
  handleInputChange: (field: string, value: string | boolean) => void;
  toggleArrayValue: (field: string, value: string) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  stage,
  formData,
  handleInputChange,
  toggleArrayValue,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (stage !== 2) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isStudent"
            checked={formData.isStudent}
            onCheckedChange={(checked) =>
              handleInputChange("isStudent", checked === true)
            }
          />
          <Label htmlFor="isStudent" className="font-medium cursor-pointer">
            I am currently a student
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isEmployed"
            checked={formData.isEmployed}
            onCheckedChange={(checked) =>
              handleInputChange("isEmployed", checked === true)
            }
          />
          <Label htmlFor="isEmployed" className="font-medium cursor-pointer">
            I am currently employed
          </Label>
        </div>
      </div>

      {formData.isEmployed && (
        <div className="space-y-4 pl-2 border-l-2 border-gray-200">
          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-sm font-medium">
              What is your occupation?
            </Label>
            <Input
              id="occupation"
              placeholder="E.g. Software Engineer, Teacher, etc."
              value={formData.occupation}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="incomeRange" className="text-sm font-medium">
              Income Range
            </Label>
            {isClient && (
              <Select
                value={formData.incomeRange}
                onValueChange={(value) =>
                  handleInputChange("incomeRange", value)
                }
              >
                <SelectTrigger id="incomeRange">
                  <SelectValue placeholder="Select your income range" />
                </SelectTrigger>
                <SelectContent>
                  {incomeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Label className="block text-sm font-medium mb-1">
          What are your interests? (Select all that apply)
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestOptions.map((interest) => (
            <div
              key={interest.id}
              className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Checkbox
                id={`interest-${interest.id}`}
                checked={formData.interests.includes(interest.id)}
                onCheckedChange={() =>
                  toggleArrayValue("interests", interest.id)
                }
              />
              <Label
                htmlFor={`interest-${interest.id}`}
                className="cursor-pointer text-sm w-full"
              >
                {interest.label}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          This helps us match you with properties in communities that align with
          your lifestyle.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;
