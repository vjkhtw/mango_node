//@ts-nocheck
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authorizedRequest from "@/lib/axios/axios";
import { toast } from "sonner";

const MonthsEnum = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const profitFormSchema = z.object({
  profitAmount: z.coerce.number().positive("Profit amount must be positive"),
  month: z.enum(MonthsEnum, "Select a valid month"),
});
const defaultValues = {
  profitAmount: 0,
  month: "January",
};

const ProfitForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(profitFormSchema),
  });

  const onSubmit = (data) => {
    const currentYear = new Date().getFullYear();
    const monthIndex = MonthsEnum.indexOf(data.month);
    const formattedData = {
      profit: data.profitAmount,
      dateTime: `${currentYear}-${
        monthIndex>=9?(monthIndex+1): "0" + (monthIndex+1) 
      }-01T00:00:00`,
    };
    authorizedRequest
      .post("/api/profit", formattedData)
      .then(toast.success("Profit Recorded."))
      .catch((e) => toast.error("Error recording profit."));
    console.log("Submitted Data:", formattedData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start space-y-4 w-full px-8 py-4 bg-gray-100 border rounded-lg"
    >
      <h1 className="text-2xl font-bold">Profit Form</h1>
      <div className="flex items-center gap-8">
        <div>
          <label htmlFor="profitAmount" className="font-medium">
            Profit Amount:
          </label>
          <Controller
            name="profitAmount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="px-2 py-1 border rounded-md"
              />
            )}
          />
          {errors.profitAmount && (
            <p className="text-red-500 text-sm">
              {errors.profitAmount.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="month" className="font-medium">
            Month:
          </label>
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <select {...field} className="px-2 py-1 border rounded-md">
                {MonthsEnum.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.month && (
            <p className="text-red-500 text-sm">{errors.month.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 self-end"
        >
          Record
        </button>
      </div>
    </form>
  );
};

export default ProfitForm;
