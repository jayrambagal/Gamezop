import { GAMEZOP_ROUTES_CATORIES } from "@/utils/enum";
import { notFound } from "next/navigation";

export const getAllData = async () => {
  try {
    const res = await fetch("https://pub.gamezop.com/v3/games?id=peSLSV");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return notFound();
  }
};
export const getDataById = async (id: string) => {
  const res = await fetch("https://pub.gamezop.com/v3/games?id=peSLSV");
  const data = await res.json();
  try {
    const categoriesData = await data.games.filter((ele: any) => {
      if (GAMEZOP_ROUTES_CATORIES[id] == ele.categories.en[0]) {
        return ele;
      }
    });
    if (categoriesData.length == 0) {
      return notFound();
    }
    return categoriesData;
  } catch (error) {
    console.log(error);
    return notFound();
  }
};
