// @ts-nocheck
"use client";
import AddRegionButton from "@/components/AddRegionButton";
import Container from "@/components/Container";
import authorizedRequest from "@/lib/axios/axios";
import { capitalizeWords, displayableDateTime } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

function Irrigation() {
  const [regions, setRegions] = useState([]);
  const [regionAdded, setRegionAdded] = useState(true);
  const router = useRouter();
  const refreshPage = () => setRegionAdded(!regionAdded);
  useEffect(() => {
    console.log("Hello");
    authorizedRequest
      .get(`api/region`)
      .then((response) => {
        return setRegions(
          response.data.data.map((region) => ({
            ...region,
            regionId: region._id,
          }))
        );
      })
      .catch((error) => toast.error(error.message));
  }, [regionAdded]);
  return (
    <Container>
      <Toaster richColors />
      <h1 className="text-2xl font-bold mb-4">Irrigation</h1>
      {regions.length > 0 &&
        regions.map(({ regionId, regionName, irrigationData }, index) => (
          <div key={index} className="my-8 border-b border-gray-400">
            <div className="flex flex-row justify-between mb-4" key={regionId}>
              <h2 className="font-semibold">{regionName}</h2>
              <button
                className="bg-orange-600 text-white p-2 rounded-md"
                onClick={() =>
                  router.push(
                    `/owner/irrigation/add-irrigation?regionId=${regionId}&regionName=${regionName}`
                  )
                }
              >
                Add Irrigation
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DateTime
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Water Used
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Area Irrigated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weather
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {irrigationData?.length > 0 &&
                  irrigationData.map(
                    ({
                      _id: irrigationId,
                      irrigationDateTime,
                      irrigationMethod,
                      waterUsed,
                      waterUsedUnit,
                      areaIrrigated,
                      areaIrrigatedUnit,
                      irrigationDuration,
                      irrigationDurationUnit,
                      weather = "",
                    }) => (
                      <tr key={irrigationId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {displayableDateTime(irrigationDateTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {capitalizeWords(irrigationMethod)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {waterUsed} {waterUsedUnit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {areaIrrigated} {areaIrrigatedUnit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {irrigationDuration} {irrigationDurationUnit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {weather}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              authorizedRequest
                                .delete(
                                  `/api/region/${regionId}/${irrigationId}`
                                )
                                .then(() => {
                                  toast.success(
                                    "Irrigation removed successfully."
                                  );
                                  router.refresh();
                                });
                            }}
                          >
                            <Trash2 className="text-red-600" />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        ))}
      <AddRegionButton onFormSubmit={refreshPage} />
    </Container>
  );
}
export default Irrigation;
