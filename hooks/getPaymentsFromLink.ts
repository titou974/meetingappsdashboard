import { ApiV1Routes, LinkWithPaymentsResponse } from "@/types";

export async function getPaymentsFromLink(
  linkId: number,
  currentPage: number,
  accessToken: string
) {
  const responsePayments = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.link}/${linkId}?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );
  const data = await responsePayments.json();
  console.log("data", data);
  return data as LinkWithPaymentsResponse;
}
