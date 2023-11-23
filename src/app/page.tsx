// "use client";
// import TrendingSlider from '@/components/Slider';
import HomeSlider from '@/components/SplideSlide/HomeSlider'
import { getDataById } from '@/services/getDataById';
import { GAMEZOP_ROUTES, dummy } from '@/utils/enum';
import dynamic from 'next/dynamic';
const TrendingSlider = dynamic(() => import('@/components/Slider'), {})
async function getCategorieData(id: string) { return getDataById(id) }

export default async function Home() {
  const ActionGames = await getCategorieData("action-games")
  const adventureGames = await getDataById("adventure-games")
  const arcadeGames = await getDataById("arcade-games")
  const puzzleGames = await getDataById("puzzle-and-logic-games")
  const sportsGames = await getDataById("sports-and-racing-games")
  const strategyGames = await getDataById("strategy-games")
  // console.log(actionGames)
  return (
    <div style={{ backgroundColor: '#ededed', marginTop: '6rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} >
      <HomeSlider />
      <TrendingSlider gamesData={ActionGames} index={0} />
      <TrendingSlider gamesData={adventureGames} index={1} />
      <TrendingSlider gamesData={arcadeGames} index={2} />
      <TrendingSlider gamesData={puzzleGames} index={3} />
      <TrendingSlider gamesData={sportsGames} index={4} />
      <TrendingSlider gamesData={strategyGames} index={5} />

    </div>
  )
}
