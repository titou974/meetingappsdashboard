import { useQuery } from "@tanstack/react-query";
import { ApiV1Routes, DailyIncomeResponse } from "@/types";

export default function useDailyIncome(accessToken: string) {
  return useQuery({
    queryKey: ["dailyIncome", accessToken], // Include accessToken in the queryKey
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.dailyIncome}?startDate=2025-04-01&endDate=2025-04-30&linkId=1`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
        // log the error
      }
      const data = await response.json();

      return data as DailyIncomeResponse;
    },
    staleTime: 10000,
    refetchOnMount: "always",
    enabled: !!accessToken, // Ensure the query only runs if accessToken is available
  });
}
