interface SectionHeaderTextProps {
    title: string;
    className?: string;
}

export default function SectionHeaderText({ title, className }: SectionHeaderTextProps) {
    return (
        <>
            <h1 className={`text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-serif font-medium text-[#3E3E3E] pb-2 ${className}`}>
                {title}
            </h1>
        </>
    )
}