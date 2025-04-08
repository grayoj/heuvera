import Currency from "@heuvera/components/icons/svgs/currency";
import { FilterOption } from "@heuvera/utils/props";
import {
  User,
  Calendar,
  CreditCard,
  HelpCircle,
  Bed,
  Home,
  Refrigerator,
  Shield,
  Utensils,
  Video,
  WashingMachine,
  Wifi,
  House,
  Wallet,
  Star,
  GitGraph,
  LifeBuoy,
  BedDouble,
  ShowerHead,
  Microwave,
  Camera,
} from "lucide-react";
import {
  IoBedOutline,
  IoHomeOutline,
  IoWaterOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const sideBar = [
  {
    route: "account",
    name: "My Account",
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

export const sideBarAdmin = [
  {
    name: 'Personal Info',
    route: '/',
    description:
      'Update your profile, contact details, and preferences to personalize your experience.',
    icon: User,
  },
  {
    route: 'property',
    name: 'Property Listings',
    description:
      'Manage and view all properties you’ve listed for rent or lease.',
    icon: House,
  },
  {
    route: 'booking',
    name: 'Booking Mangement',
    description: 'Track upcoming, ongoing, and past bookings in one place',
    icon: Calendar,
  },
  {
    route: 'earnings',
    name: 'Earnings & Payouts',
    description:
      'Monitor your earnings, track pending payments, and manage payout preferences.',
    icon: Wallet,
  },
  {
    route: 'reviews',
    name: 'Reviews & Ratings',
    description:
      'View guest feedback, monitor your ratings, and maintain your reputation.',
    icon: Star,
  },
  {
    route: 'insights',
    name: 'Property Insights',
    description:
      'Analyze booking trends, occupancy rates, and performance metrics for your listings. ',
    icon: GitGraph,
  },
  {
    route: 'support',
    name: 'Support & Assistance',
    description:
      'Access help articles, contact support, or resolve issues with your listings. ',
    icon: LifeBuoy,
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

export const upcomingBookings = [
  {
    guestName: 'Godiwn Praise',
    date: 'Mar 12, 2025 - Mar 21, 2025',
    propertyName: 'George duplex',
    status: 'Pending',
  },
  {
    guestName: 'Godiwn Praise',
    date: 'Mar 12, 2025 - Mar 21, 2025',
    propertyName: 'George duplex',
    status: 'Pending',
  },
];
export const pastAdminBookings = [
  {
    image: 'hheye',
    name: 'George’s Semi Detached',
    location: 'Behind Block C, Abuja',
    date: 'Mar 12, 2025 - Mar 21, 2025',
    status: 'Pending',
    pricePaid: '50,000',
    noOfGuests: 3,
  },
  {
    image: 'hheye',
    name: 'Emma Semi Detached',
    location: 'Behind Block C, Abuja',
    date: 'Mar 12, 2025 - Mar 21, 2025',
    status: 'Pending',
    pricePaid: '50,000',
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
    placeholder: "Anywhere",
  },
  {
    id: "dates",
    label: "When",
    placeholder: "Any week",
  },
  {
    id: "guests",
    label: "Who",
    placeholder: "Add guests",
  },
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

export const propertyCategories = [
  { id: 1, category: "Town House", count: 2, imageUrl: "/town.jpg" },
  { id: 2, category: "Apartment", count: 5, imageUrl: "/apartment.jpg" },
  { id: 3, category: "Villa", count: 3, imageUrl: "/villa.jpg" },
  { id: 4, category: "Penthouse", count: 1, imageUrl: "/penthouse.jpg" },
  { id: 5, category: "Cottage", count: 4, imageUrl: "/cottage.jpg" },
];

export const propertyLocation = [
  { id: 1, category: "Abuja", count: 158, imageUrl: "/abuja.jpg" },
  { id: 2, category: "Lagos", count: 94, imageUrl: "/lagos.jpg" },
  { id: 3, category: "Kano", count: 76, imageUrl: "/kano.jpg" },
  { id: 4, category: "Chicago", count: 63, imageUrl: "/chicago.jpg" },
  {
    id: 5,
    category: "San Francisco",
    count: 52,
    imageUrl: "/sanfrancisco.jpg",
  },
  { id: 6, category: "Austin", count: 47, imageUrl: "/austin.jpg" },
];


export const propertyListings = [
  {
    image: '',
    price: '₦50,000',
    address: '3617 W.Gray St. Utica',
    noOfBeds: 2,
    noOfBaths: 2,
    measurement: '60m^2',
  },
];

export const earnings = [
  {
    heading: 'Total Earnings',
    amount: '₦2,500,000',
    percent: 45,
  },
  {
    heading: 'Pending Payout',
    amount: '₦2,500,000',
    percent: 35,
  },
  {
    heading: 'Available Balance',
    amount: '₦2,500,000',
    percent: 47,
  },
];

export const earningsTable = [
  {
    method: 'Bank Transfer',
    date: 'Mar 12, 2025',
    amount: '₦2,500,000',
    status: 'Pending',
  },
  {
    method: 'Bank Transfer',
    date: 'Mar 12, 2025',
    amount: '₦2,500,000',
    status: 'Completed',
  },
];

export const reviews = [
  {
    guestName: 'Godwin Praise Tochi',
    date: 'Mar 12, 2025',
    rating: 5,
    content:
      'George’s Property is one of the best I have ever stayed in. It’s even better than the house I live in presentlydvndsbhbvahbnjib nfuvbfmxbifbnakuvfb nb oiubgnbjetuhnybviubdnu',
  },
  {
    guestName: 'Edward Mfon Sarah',
    date: 'Mar 12, 2025',
    rating: 3,
    content:
      'George’s Property is one of the best I have ever stayed in. It’s even better than the house I live in presently',
  },
];

export const amenities = [
  {
    name: 'Wifi',
    icon: Wifi,
  },
  { 
    name: 'Video Cam', 
    icon: Camera 
  },
  { 
    name: 'Washer', 
    icon: WashingMachine 
  },
  { 
    name: 'Kitchen', 
    icon: Microwave 
  },
  { 
    name: 'Refrigerator', 
    icon: Refrigerator 
  },
  { 
    name: 'Wifi', 
    icon: Wifi 
  },
];

export   const features = [
  {
    type: 'guest',
    icon: User ,
    label: 'Guest',
  },
  {
    type: 'bed',
    icon: BedDouble,
    label: 'Bedroom',
  },
  {
    type: 'bath',
    icon: ShowerHead,
    label: 'Bathroom',
  },
];