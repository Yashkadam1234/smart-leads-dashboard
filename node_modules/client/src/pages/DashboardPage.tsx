import {
  LayoutDashboard,
  Users,
  BadgeCheck,
  XCircle,
} from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import { getLeads } from "../api/leadsApi";

import type {
  ILead,
  IPaginatedResponse,
} from "@shared/index";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<
    IPaginatedResponse<ILead[]>
  >({
    queryKey: [
      "dashboard-leads",
    ],
    queryFn: () =>
      getLeads({
        page: 1,
        limit: 50,
        sort: "latest",
      }),
  });

  const leads: ILead[] =
    data?.data ?? [];

  const stats = useMemo(
    () => ({
      total: leads.length,

      new: leads.filter(
        (lead: ILead) =>
          lead.status ===
          "new"
      ).length,

      qualified:
        leads.filter(
          (lead: ILead) =>
            lead.status ===
            "qualified"
        ).length,

      lost: leads.filter(
        (lead: ILead) =>
          lead.status ===
          "lost"
      ).length,
    }),
    [leads]
  );

  const recentLeads =
    leads.slice(0, 5);

  return (
    <DashboardLayout title="Dashboard">
      {/* Stats */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          title="Total Leads"
          value={stats.total}
          icon={
            <Users size={28} />
          }
          color="from-cyan-500 to-blue-500"
          isLoading={isLoading}
        />

        <StatCard
          title="New Leads"
          value={stats.new}
          icon={
            <LayoutDashboard
              size={28}
            />
          }
          color="from-cyan-500 to-sky-500"
          isLoading={isLoading}
        />

        <StatCard
          title="Qualified"
          value={
            stats.qualified
          }
          icon={
            <BadgeCheck
              size={28}
            />
          }
          color="from-violet-500 to-fuchsia-500"
          isLoading={isLoading}
        />

        <StatCard
          title="Lost"
          value={stats.lost}
          icon={
            <XCircle size={28} />
          }
          color="from-red-500 to-orange-500"
          isLoading={isLoading}
        />
      </div>

      {/* Recent Leads */}
      <section className="mt-8">
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            p-6
          "
        >
          <div className="mb-6">
            <h2
              className="
                text-2xl
                font-bold
                text-white
                font-space
              "
            >
              Recent Leads
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Latest 5 leads
            </p>
          </div>

          {isError ? (
            <ErrorState
              message="Failed to load leads."
              onRetry={() =>
                refetch()
              }
            />
          ) : isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map(
                (_, index) => (
                  <div
                    key={index}
                    className="
                      h-16
                      animate-pulse
                      rounded-2xl
                      bg-slate-800
                    "
                  />
                )
              )}
            </div>
          ) : recentLeads.length ===
            0 ? (
            <EmptyState
              title="No leads yet"
              description="Create your first lead to get started."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className="
                      border-b
                      border-slate-800
                      text-left
                    "
                  >
                    <th className="pb-4 text-slate-400">
                      Name
                    </th>

                    <th className="pb-4 text-slate-400">
                      Email
                    </th>

                    <th className="pb-4 text-slate-400">
                      Status
                    </th>

                    <th className="pb-4 text-slate-400">
                      Source
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentLeads.map(
                    (
                      lead: ILead
                    ) => (
                      <tr
                        key={
                          lead.id
                        }
                        className="
                          border-b
                          border-slate-800/60
                        "
                      >
                        <td className="py-4 text-white">
                          {
                            lead.name
                          }
                        </td>

                        <td className="py-4 text-slate-300">
                          {
                            lead.email
                          }
                        </td>

                        <td className="py-4">
                          <span
                            className="
                              rounded-full
                              border
                              border-cyan-500/30
                              bg-cyan-500/10
                              px-3
                              py-1
                              text-xs
                              uppercase
                              text-cyan-300
                            "
                          >
                            {
                              lead.status
                            }
                          </span>
                        </td>

                        <td className="py-4 capitalize text-slate-300">
                          {
                            lead.source
                          }
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}