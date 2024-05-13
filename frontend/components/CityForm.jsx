import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CityForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(cityFormSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center space-y-4 w-full px-8 py-4 bg-gray-100 border rounded-lg"
    >
      <h1 className="text-2xl font-bold mb-4">City Form</h1>

      <div className="flex items-center space-x-4">
        <label htmlFor="cityName" className="font-medium">
          City Name:
        </label>
        <Controller
          name="cityName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="px-2 py-1 border rounded-md"
            />
          )}
        />
        {errors.cityName && (
          <p className="text-red-500 text-sm">{errors.cityName.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="longitude" className="font-medium">
          Longitude:
        </label>
        <Controller
          name="longitude"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="px-2 py-1 border rounded-md"
            />
          )}
        />
        {errors.longitude && (
          <p className="text-red-500 text-sm">{errors.longitude.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="latitude" className="font-medium">
          Latitude:
        </label>
        <Controller
          name="latitude"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="px-2 py-1 border rounded-md"
            />
          )}
        />
        {errors.latitude && (
          <p className="text-red-500 text-sm">{errors.latitude.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <label className="font-medium">Time From GMT:</label>
        <Controller
          name="gmtOffset.sign"
          control={control}
          render={({ field }) => (
            <select {...field} className="px-2 py-1 border rounded-md">
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
          )}
        />
        <Controller
          name="gmtOffset.hours"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              min="0"
              max="14"
              className="px-2 py-1 border rounded-md"
            />
          )}
        />
        {errors.gmtOffset?.hours && (
          <p className="text-red-500 text-sm">
            {errors.gmtOffset.hours.message}
          </p>
        )}
        <Controller
          name="gmtOffset.minutes"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              min="0"
              max="59"
              className="px-2 py-1 border rounded-md"
            />
          )}
        />
        {errors.gmtOffset?.minutes && (
          <p className="text-red-500 text-sm">
            {errors.gmtOffset.minutes.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default CityForm;
