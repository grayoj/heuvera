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

interface HostApprovalEmailProps {
  userName: string;
  dashboardLink: string;
}

export default function HostApprovalEmailTemplate({
  userName,
  dashboardLink,
}: HostApprovalEmailProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Congratulations! You're now an approved host on Heuvera.</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="max-w-lg mx-auto bg-[#F3F2ED] shadow-lg rounded-md p-8 text-center border">
            <div>
              <img
                src="https://yzub7xjzmf.ufs.sh/f/p5WCAJ95HVcjzNlGDk4hqBZ5bN2HwXOd8mA0UrnlSKEJ9PWi"
                alt="Heuvera"
                width="50"
                className="mx-auto"
              />
            </div>

            <Text className="text-2xl font-semibold text-gray-900 mt-6">
              Welcome, {userName}!
            </Text>
            <Text className="text-gray-700 leading-relaxed">
              Congratulations! Your host application on heuvera has been approved. You're now ready to list your properties and start welcoming guests.
            </Text>

            <div className="mt-6">
              <Button
                href={dashboardLink}
                className="w-full bg-[#8F6858] text-white text-lg font-semibold py-3 rounded-md transition-all cursor-pointer"
              >
                Visit Dashboard
              </Button>
            </div>

            <Text className="text-gray-600 text-sm mt-6">
              Need help? Get in touch with our <a className='text-[#8F6858] cursor-pointer no-underline' href="https://heuvera.com/contact">Support</a>.
            </Text>

            <Text className="text-gray-800 font-semibold mt-6">
              The Heuvera Team
            </Text>

            <div className="flex justify-center gap-4 mt-6">
              <a href="#" className="text-[#8F6858]">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="24" alt="Facebook" />
              </a>
              <a href="#" className="text-[#8F6858]">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="24" alt="Twitter" />
              </a>
              <a href="#" className="text-[#8F6858]">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" alt="Instagram" />
              </a>
            </div>

            <Text className="text-xs text-gray-500 mt-6">
              © {currentYear} Heuvera. All rights reserved. <br />
              <a href="#" className="text-[#8F6858] font-semibold">Unsubscribe</a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

