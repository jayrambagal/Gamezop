import dynamic from 'next/dynamic';
import { homeCategoryData } from '@/services';
import HomeCarousel from '@/components/HomeCarousel'
const CategoryContainer = dynamic(() => import('@/components/CategoryContainer'), {})


export default async function Home() {
  const categoriesData = await homeCategoryData()
  return (
    <main className='homePageMainCon'>
      <HomeCarousel CarouselData={categoriesData} />
      {categoriesData.map((data: any, index: number) => (
        <CategoryContainer CategoryData={data} key={index} index={index} />))
      }
    </main>
  )
}