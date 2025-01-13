import { getNavigationData, groupLinksByCategory } from '@/utils/navigation'

export default async function HomePage() {
  const data = await getNavigationData()
  const linksByCategory = groupLinksByCategory(data)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        导航站点
      </h1>
      
      <div className="grid gap-8">
        {data.categories.map(category => (
          <section key={category.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {linksByCategory[category.id]?.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
} 