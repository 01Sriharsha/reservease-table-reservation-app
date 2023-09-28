"use client";

import { apiClient } from "@/utils/axios";
import { useState } from "react";

type AvailabilityParams = {
  slug: string;
  date: string;
  time: string;
  partySize: string;
};

type ResponseData = {
  time: string;
  available: boolean;
};

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState<ResponseData[] | null>([]);

  const fetchAvailabilities = async ({
    slug,
    date,
    time,
    partySize,
  }: AvailabilityParams) => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        `/restaurant/${slug}/availability`,
        {
          params: { date, time, partySize },
        }
      );
      
      setData(response.data.availabilities);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return { loading, error, data, fetchAvailabilities };
}
