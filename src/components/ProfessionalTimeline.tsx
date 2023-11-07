import ContentCard from "@/components/ContentCard/ContentCard";

const ProfessionalTimeline = () => {
  const timelineData = [
    {
      date: "2022 - Present",
      title: "Software Engineer, Digital Technology AVP",
      company: "HTLF Bank",
      country: "🇺🇸",
    },
    {
      date: "2021 - 2022",
      title: "Frontend Engineer",
      company: "HTLF Bank",
      country: "🇺🇸",
    },
    {
      date: "2020 - 2021",
      title: "Software Engineer",
      company: "Freelance/Contract",
      country: "🇺🇸",
    },
    {
      date: "2020 - 2020",
      title: "Advanced Software Engineering",
      company: "Hack Reactor",
      country: "🇺🇸",
    },
    {
      date: "2013 - 2019",
      title: "Director of Ecommerce",
      company: "Firespares/Stove Supermarket",
      country: "🇬🇧",
    },
    {
      date: "2008 - 2010",
      title: "FdA in Communication, Graphic Design",
      company: "University of the Arts London",
      country: "🇬🇧",
    },
  ];

  return (
    <ContentCard
      show={false}
      title="Professional Timeline"
      content={
        <ul className="space-y-4">
          {timelineData.map((item, index) => (
            <li key={index}>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-gray-900 dark:text-gray-300 font-semibold">
                      {item.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 font-extralight">
                      {item.company}
                      <span className="ml-2 text-lg">{item.country}</span>
                    </p>
                  </div>
                </div>
                <span className="text-gray-600 dark:text-gray-300 font-extralight">
                  {item.date}
                </span>
              </div>
            </li>
          ))}
        </ul>
      }
    />
  );
};

export default ProfessionalTimeline;
