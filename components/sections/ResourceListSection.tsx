export default function ResourceListSection({
  title,
  description,
  resources,
}: any) {
  if (!resources?.length) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "document":
        return "📄";
      case "video":
        return "🎥";
      case "link":
        return "🔗";
      case "tool":
        return "🛠️";
      default:
        return "📌";
    }
  };

  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      {title && (
        <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
      )}

      {description && (
        <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
          {description}
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource: any, index: number) => (
          <a
            key={index}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-slate-200 rounded-xl hover:shadow-lg transition-all hover:border-teal-500 bg-white"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{getIcon(resource.type)}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 text-slate-900">
                  {resource.title}
                </h3>
                {resource.description && (
                  <p className="text-sm text-slate-600">
                    {resource.description}
                  </p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
