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
      <h1 className="text-2xl font-serif font-medium text-[#3E3E3E] pb-2">
        Important Information
      </h1>
      <div className="flex flex-row gap-10">
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
