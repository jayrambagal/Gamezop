import { CATEGORY_DETAILS } from "@/utils/enum";
import { notFound } from "next/navigation";

export const getAllData = async () => {
  try {
    const res = await fetch(`${process.env.API_KEY}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return notFound();
  }
};
export const getDataById = async (id: string) => {
  const res = await fetch(`${process.env.API_KEY}`);
  const data = await res.json();
  try {
    const categoriesData = await data.games.filter((ele: any) => {
      if (CATEGORY_DETAILS[id].category == ele.categories.en[0]) {
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

export const homeCategoryData = async () => {
  try {
    const ActionGames = await getDataById("action-games");
    const adventureGames = await getDataById("adventure-games");
    const arcadeGames = await getDataById("arcade-games");
    const puzzleGames = await getDataById("puzzle-and-logic-games");
    const sportsGames = await getDataById("sports-and-racing-games");
    const strategyGames = await getDataById("strategy-games");

    const AllCategoriesData = [
      {
        name: "action-games",
        data: ActionGames.slice(0, 9),
      },
      {
        name: "adventure-games",
        data: adventureGames.slice(0, 9),
      },
      {
        name: "arcade-games",
        data: arcadeGames.slice(0, 9),
      },
      {
        name: "puzzle-and-logic-games",
        data: puzzleGames.slice(0, 9),
      },
      {
        name: "sports-and-racing-games",
        data: sportsGames.slice(0, 9),
      },
      {
        name: "strategy-games",
        data: strategyGames.slice(0, 9),
      },
    ];
    return AllCategoriesData;
  } catch (error) {
    console.log(error);
    notFound();
  }
};
