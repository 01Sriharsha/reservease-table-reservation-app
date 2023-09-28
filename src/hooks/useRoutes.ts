"use client";

import { GrGallery  } from "react-icons/gr";
import { GiTable  } from "react-icons/gi";
import { RiReservedFill  } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { BiFoodMenu ,BiCurrentLocation } from "react-icons/bi";
import {
  MdOutlineManageAccounts,
  MdOutlineReviews,
  MdDashboard,
  MdOutlineTableBar,
  MdOutlineFoodBank
} from "react-icons/md";
import { useMemo } from "react";
import { ROLE } from "@prisma/client";
import useAuth from "./useAuth";
import { SiNginxproxymanager } from "react-icons/si";
import { FaUsersGear } from "react-icons/fa6";
import { CiSquareQuestion } from "react-icons/ci";

export default function useRoutes() {
  const { data } = useAuth();

  const adminRoutes = [
    {
      label: "Dashboard",
      href: `/admin/manage`,
      icon: SiNginxproxymanager,
      dashboard: [
        {
          label: "Users",
          href: `/admin/manage/users`,
          icon: FaUsersGear,
        },
        {
          label: "Requests",
          href: `/admin/manage/requests`,
          icon: CiSquareQuestion,
        },
        {
          label: "Cuisine",
          href: `/admin/manage/cuisine`,
          icon: MdOutlineFoodBank,
        },
        {
          label: "Location",
          href: `/admin/manage/location`,
          icon: BiCurrentLocation,
        },
      ],
    },
  ];

  const routes = useMemo(
    () =>
      data?.role === ROLE.ADMIN
        ? adminRoutes
        : [
            {
              label: "Profile",
              href: `/user/@${data?.first_name}/profile`,
              icon: ImProfile,
            },
            {
              label: "Bookings",
              href: `/user/@${data?.first_name}/bookings`,
              icon: MdOutlineTableBar,
            },
            {
              label: "Dashboard",
              href: `/business/${data?.restaurant_slug}`,
              icon: MdDashboard,
              dashboard: [
                {
                  label: "Manage",
                  href: `/business/${data?.restaurant_slug}/manage`,
                  icon: MdOutlineManageAccounts,
                },
                {
                  label: "Menu",
                  href: `/business/${data?.restaurant_slug}/menu`,
                  icon: BiFoodMenu,
                },
                {
                  label: "Tables",
                  href: `/business/${data?.restaurant_slug}/tables`,
                  icon: GiTable,
                },
                {
                  label: "Gallery",
                  href: `/business/${data?.restaurant_slug}/gallery`,
                  icon: GrGallery,
                },
                {
                  label: "Reviews",
                  href: `/business/${data?.restaurant_slug}/reviews`,
                  icon: MdOutlineReviews,
                },
                {
                  label: "Reservations",
                  href: `/business/${data?.restaurant_slug}/reservations`,
                  icon: RiReservedFill,
                },
              ],
            },
          ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
  return routes;
}
