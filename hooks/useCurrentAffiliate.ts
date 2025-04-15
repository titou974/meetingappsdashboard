import { useQuery } from "@tanstack/react-query";
import { ApiV1Routes, AffiliateLight } from "@/types";

export default function useGetCurrentAffiliate(accessToken: string) {
  return useQuery({
    queryKey: ["currentAffiliate", accessToken], // Include accessToken in the queryKey
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${ApiV1Routes.currentAffiliate}`,
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
      const data = (await response.json()) as AffiliateLight;
      console.log("affiliateData", data);
      return data;
    },
    staleTime: 10000,
    refetchOnMount: "always",
    enabled: !!accessToken, // Ensure the query only runs if accessToken is available
  });
}
