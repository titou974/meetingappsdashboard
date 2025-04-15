import { useQuery } from "@tanstack/react-query";
import { DailyIncomeResponse } from "@/types";
export default function useDailyIncome(accessToken: string) {
  return useQuery({
    queryKey: ["dailyIncome", accessToken], // Include accessToken in the queryKey
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/income/daily?startDate=2025-04-01&endDate=2025-04-30&linkId=1`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      console.log("Response Status", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
        // log the error
      }
      const data = await response.json();

      console.log("Daily Income Data:", data);

      return data as DailyIncomeResponse;
    },
    staleTime: 10000,
    refetchOnMount: "always",
    enabled: !!accessToken, // Ensure the query only runs if accessToken is available
  });
}
