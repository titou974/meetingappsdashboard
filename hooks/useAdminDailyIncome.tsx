import { useQuery } from "@tanstack/react-query";
import { ApiV1Routes, DailyIncomeResponse } from "@/types";

export default function useAdminDailyIncome(accessToken: string) {
  return useQuery({
    queryKey: ["adminDailyIncome", accessToken], // Include accessToken in the queryKey
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.adminDailyIncome}`,
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
    enabled: !!accessToken,
  });
}
