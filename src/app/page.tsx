// "use client";
// import TrendingSlider from '@/components/Slider';
import HomeSlider from '@/components/SplideSlide/HomeSlider'
import { homePageAllCatData } from '@/services';
import dynamic from 'next/dynamic';
const TrendingSlider = dynamic(() => import('@/components/Slider'), {})

export default async function Home() {
  const allcatdata = await homePageAllCatData()
  return (
    <main className='homePageMainCon'>
      <HomeSlider />
      {
        allcatdata.map((cat, idx) => (
          <TrendingSlider category={cat} key={idx} index={idx} />
        ))
      }
    </main>
  )
}