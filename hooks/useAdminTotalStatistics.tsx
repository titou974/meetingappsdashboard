import { ApiV1Routes, TotalStatsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useAdminTotalStatistics(accessToken: string) {
  return useQuery({
    queryKey: ["totalStatsAdmin", accessToken], // Include accessToken in the queryKey
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.adminTotalStats}`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("adminTotalStatsfetched", data);
      return data as TotalStatsResponse;
    },
    staleTime: 10000,
    refetchOnMount: "always",
    refetchInterval: 10000,
    enabled: !!accessToken, // Ensure the query only runs if accessToken is available
  });
}
