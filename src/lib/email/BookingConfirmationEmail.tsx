import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
  Tailwind,
} from '@react-email/components';

interface BookingConfirmationEmailProps {
  guestName: string;
  propertyName: string;
  propertyLocation: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  totalPrice: string;
  bookingDetailsLink: string;
}

export default function BookingConfirmationEmailTemplate({
  guestName,
  propertyName,
  propertyLocation,
  checkInDate,
  checkOutDate,
  guestCount,
  totalPrice,
  bookingDetailsLink,
}: BookingConfirmationEmailProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Your booking at {propertyName} is confirmed!</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="max-w-lg mx-auto bg-[#F3F2ED] shadow-lg rounded-md p-8 text-center">
            <div>
              <img
                src="https://yzub7xjzmf.ufs.sh/f/p5WCAJ95HVcjzNlGDk4hqBZ5bN2HwXOd8mA0UrnlSKEJ9PWi"
                alt="Heuvera"
                width="50"
                className="mx-auto"
              />
            </div>

            <Text className="text-2xl font-semibold text-gray-900 mt-6">
              Hi {guestName}, your booking is confirmed! 🎉
            </Text>

            <Text className="text-gray-700 leading-relaxed">
              We’re excited to host you at <strong>{propertyName}</strong>. Here
              are your stay details:
            </Text>

            <div className="bg-gray-100 p-4 rounded-lg text-left mt-4">
              <Text className="text-gray-900 font-semibold">
                Booking Details:
              </Text>
              <ul className="text-gray-700 leading-relaxed text-sm">
                <li>
                  <strong>Property:</strong> {propertyName}
                </li>
                <li>
                  <strong>Location:</strong> {propertyLocation}
                </li>
                <li>
                  <strong>Check-in:</strong> {checkInDate}
                </li>
                <li>
                  <strong>Check-out:</strong> {checkOutDate}
                </li>
                <li>
                  <strong>Guests:</strong> {guestCount}
                </li>
                <li>
                  <strong>Total Price:</strong> {totalPrice}
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <Button
                href={bookingDetailsLink}
                className="w-full bg-[#8F6858] text-white text-lg font-semibold py-3 rounded-md transition-all cursor-pointer"
              >
                View Booking
              </Button>
            </div>

            <Text className="text-gray-600 text-sm mt-6">
              Need assistance? Our{' '}
              <a
                className="text-[#8F6858] cursor-pointer no-underline"
                href="https://heuvera.com/contact"
              >
                Support Team
              </a>{' '}
              is available 24/7.
            </Text>

            <Text className="text-gray-800 font-semibold mt-6">
              The Heuvera Team
            </Text>

            <div className="flex justify-center gap-4 mt-6">
              <a href="#" className="text-[#8F6858]">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  width="24"
                  alt="Facebook"
                />
              </a>
              <a href="#" className="text-[#8F6858]">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  width="24"
                  alt="Twitter"
                />
              </a>
              <a href="#" className="text-[#8F6858]">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  width="24"
                  alt="Instagram"
                />
              </a>
            </div>

            <Text className="text-xs text-gray-500 mt-6">
              © {currentYear} Heuvera. All rights reserved. <br />
              <a href="#" className="text-[#8F6858] font-semibold">
                Cancel Booking
              </a>{' '}
              |{' '}
              <a href="#" className="text-[#8F6858] font-semibold">
                Contact Support
              </a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
