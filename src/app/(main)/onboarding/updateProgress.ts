// import { FormData } from "./page";

// export const calculateProgress = (
//   stage: number,
//   formData: FormData
// ): number => {
//   let filledFields = 0;
//   let totalFields = 0;

//   if (stage === 1) {
//     totalFields = 4;
//     if (formData.country) filledFields++;
//     if (formData.state) filledFields++;
//     if (formData.city) filledFields++;
//     if (formData.address) filledFields++;
//   } else if (stage === 2) {
//     totalFields = 5;
//     filledFields += 2; // isStudent and isEmployed
//     if (formData.occupation) filledFields++;
//     if (formData.incomeRange) filledFields++;
//     if (formData.interests.length > 0) filledFields++;
//   } else if (stage === 3) {
//     totalFields = 7;
//     if (formData.preferredRentRange) filledFields++;
//     if (formData.preferredPropertyTypes.length > 0) filledFields++;
//     if (formData.moveInDate) filledFields++;
//     if (formData.stayDuration) filledFields++;
//     filledFields += 3; // hasPets, hasChildren, smoking
//   }

//   return Math.round((filledFields / totalFields) * 100);
// };
