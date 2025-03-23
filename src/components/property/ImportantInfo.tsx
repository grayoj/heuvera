import SectionHeaderText from '../text/SectionHeaderText';
import InfoSection from './InfoSection';

export default function ImportantInfo() {
  const sections = [
    {
      title: 'Property Rules',
      items: [
        '🍔 Do not bring in external food',
        '🚬 Smoking is not allowed',
        '🐾 Pets are not allowed',
      ],
    },
    {
      title: 'Property Policy',
      items: [
        '❌ No cancellations allowed',
        '👥 No additional guests permitted',
        '🍷 Drinking is prohibited',
      ],
    },
    {
      title: 'Property Safety',
      items: [
        '📹 Live 24/7 CCTV camera',
        '🛡️ Property guards present',
        '🔥 Smoke detector enabled',
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2">
      <SectionHeaderText title='Important Information'/>
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-6 md:gap-10 lg:gap-10 xl:gap-10 2xl:gap-10">
        {sections.map((section, index) => (
          <InfoSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>
    </div>
  );
}
