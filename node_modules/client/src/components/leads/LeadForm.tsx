import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

import {
  useCreateLead,
  useUpdateLead,
} from "../../hooks/useLeads";

import type {
  ILead,
  ICreateLeadInput,
  LeadSource,
  LeadStatus,
} from "@shared/index";

const leadFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  status: z.enum([
    "new",
    "contacted",
    "qualified",
    "lost",
  ]),
  source: z.enum([
    "website",
    "instagram",
    "referral",
  ]),
  notes: z
    .string()
    .max(
      500,
      "Notes cannot exceed 500 characters"
    )
    .optional(),
});

type LeadFormData =
  z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  lead?: ILead | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const statusOptions = [
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Lost", value: "lost" },
];

const sourceOptions = [
  { label: "Website", value: "website" },
  { label: "Instagram", value: "instagram" },
  { label: "Referral", value: "referral" },
];

export default function LeadForm({
  lead,
  onSuccess,
  onCancel,
}: LeadFormProps) {
  const [apiError, setApiError] =
    useState("");

  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead();

  const isEditing = Boolean(lead);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "new",
      source: "website",
      notes: "",
    },
  });

  const selectedStatus = watch("status");
  const selectedSource = watch("source");

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status as LeadStatus,
        source: lead.source as LeadSource,
        notes: lead.notes ?? "",
      });
    }
  }, [lead, reset]);

  const onSubmit = async (
    data: LeadFormData
  ): Promise<void> => {
    try {
      setApiError("");

      if (lead) {
        await updateMutation.mutateAsync({
          id: lead.id,
          data,
        });

        toast.success(
          "Lead updated successfully"
        );
      } else {
        await createMutation.mutateAsync(
          data as ICreateLeadInput
        );

        toast.success(
          "Lead created successfully"
        );
      }

      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      setApiError(message);
      toast.error(message);
    }
  };

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {apiError && (
        <div
          className="
            rounded-xl
            border border-red-500/30
            bg-red-500/10
            px-4 py-3
            text-sm text-red-300
          "
        >
          {apiError}
        </div>
      )}

      <Input
        label="Name"
        placeholder="Lead name"
        register={register("name")}
        error={errors.name}
      />

      <Input
        label="Email"
        type="email"
        placeholder="lead@example.com"
        register={register("email")}
        error={errors.email}
      />

      <Select<LeadStatus>
        label="Status"
        options={statusOptions}
        value={selectedStatus}
        onChange={(value) =>
          setValue("status", value, {
            shouldValidate: true,
          })
        }
        error={errors.status}
        placeholder=""
      />

      <Select<LeadSource>
        label="Source"
        options={sourceOptions}
        value={selectedSource}
        onChange={(value) =>
          setValue("source", value, {
            shouldValidate: true,
          })
        }
        error={errors.source}
        placeholder=""
      />

      <Textarea
        label="Notes"
        placeholder="Optional notes..."
        register={register("notes")}
        error={errors.notes}
        rows={4}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          isLoading={isLoading}
        >
          {isEditing
            ? "Save Changes"
            : "Create Lead"}
        </Button>
      </div>
    </form>
  );
}