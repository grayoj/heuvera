import Currency from "@heuvera/components/icons/svgs/currency";
import { FilterOption } from "@heuvera/utils/props";
import { User, Calendar, CreditCard, HelpCircle, Bed, Home, Refrigerator, Shield, Utensils, Video, WashingMachine, Wifi } from "lucide-react";
import { IoBedOutline, IoHomeOutline, IoWaterOutline, IoTicketOutline } from "react-icons/io5";

export const sideBar = [
  {
    name: "Personal Info",
    route: "personal",
    description:
      "Update your profile, contact details, and preferences to personalize your experience.",
    icon: User,
  },
  {
    route: "booking",
    name: "Booking History",
    description:
      "View and manage your past, current, and upcoming bookings in one place.",
    icon: Calendar,
  },
  {
    route: "payment",
    name: "Payment Methods",
    description:
      "Securely manage and update your preferred payment options for smooth transactions.",
    icon: CreditCard,
  },
  {
    route: "support",
    name: "Support & Assistance",
    description:
      "Get help, contact support, and access resources to enhance your experience.",
    icon: HelpCircle,
  },
];

export const personInput = [
  {
    label: "First name",
    value1: "George",
    label2: "Last name",
    value2: "Doe",
  },
  {
    label: "Email",
    value: "ftgeorgean@gmail.com",
    primaryBtn: "Change email",
    secondaryBtn: "Add another phone number",
  },
  {
    label: "Phone Number",
    value: "+234 704 953 2023",
    primaryBtn: "Change phone number",
    secondaryBtn: "Add another email",
  },
  {
    label: "Address",
    primaryBtn: "Change address",
    value: "No.2 West Street, Nursing Estate, Karu, Abuja",
    secondaryBtn: "Add another address",
  },
];

export const pastBookings = [
  {
    image: "hheye",
    name: "George’s Semi Detached",
    location: "Behind Block C, Abuja",
    date: "Mar 12, 2025 - Mar 21, 2025",
    status: "Pending",
    pricePaid: "50,000",
    noOfGuests: 3,
  },
  {
    image: "hheye",
    name: "George’s Semi Detached",
    location: "Behind Block C, Abuja",
    date: "Mar 12, 2025 - Mar 21, 2025",
    status: "Pending",
    pricePaid: "50,000",
    noOfGuests: 3,
  },
];

export const help = [
  {
    title: "Some information isn’t displayed",
    description:
      "Rest assured, we’ve taken steps to safeguard your identity by noy displaying certain account details",
  },
  {
    title: "Some information isn’t displayed",
    description:
      "Rest assured, we’ve taken steps to safeguard your identity by noy displaying certain account details",
  },
];

export const inputs = [
  { name: "Full Name", value: "John Doe" },
  { name: "Email", value: "george" },
];

export const FILTER_OPTIONS: FilterOption[] = [
  {
    id: "location",
    label: "Where",
    placeholder: "Anywhere"
  },
  {
    id: "dates",
    label: "When",
    placeholder: "Any week"
  },
  {
    id: "guests",
    label: "Who",
    placeholder: "Add guests"
  }
];


export const NUMBER_OPTIONS = {
  bedrooms: ["Any", "1", "2", "3", "4", "5", "5+"],
  bathrooms: ["Any", "1", "2", "3", "4", "5", "5+"],
};

export const AMENITIES_CONFIG = [
  { name: "Wifi", icon: Wifi, defaultSelected: true },
  { name: "Washer", icon: WashingMachine, defaultSelected: true },
  { name: "Kitchen", icon: Utensils, defaultSelected: true },
  { name: "Security cameras", icon: Video, defaultSelected: false },
  { name: "Refrigerator", icon: Refrigerator, defaultSelected: false },
];

export const TABS_CONFIG = [
  { id: "price", icon: Currency, label: "Price", mobileLabel: "Price" },
  {
    id: "rooms",
    icon: IoBedOutline,
    label: "Rooms & Beds",
    mobileLabel: "Rooms",
  },
  { id: "type", icon: IoHomeOutline, label: "Type", mobileLabel: "Type" },
  {
    id: "amenities",
    icon: IoWaterOutline,
    label: "Amenities",
    mobileLabel: "Amen.",
  },
  { id: "book", icon: IoTicketOutline, label: "Book", mobileLabel: "Book" },
];

export const PROPERTY_TYPES = [
  { name: "Entire place", icon: Home },
  { name: "Private room", icon: Bed },
  { name: "Shared room", icon: Shield },
  { name: "Apartment", icon: Home },
  { name: "House", icon: Home },
  { name: "Loft", icon: Home },
];