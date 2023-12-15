"use client";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Graph from "./graph";
// import { SPACE_DATA } from "@/constants";

const Reservation = () => {
  const [current, setCurrent] = useState("2F");
  const [selected, setSelected] = useState(undefined);

  const { data, isLoading, error } = useFetch("get_parking_lot");

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  const getGraphData = (data) => {
    let graphData = new Object();
    graphData["2F"] = data.filter((d) => d.floor === "2F")[0].list_of_status;
    graphData["1F"] = data.filter((d) => d.floor === "1F")[0].list_of_status;
    graphData["B1"] = data.filter((d) => d.floor === "B1")[0].list_of_status;
    graphData["B2"] = data.filter((d) => d.floor === "B2")[0].list_of_status;
    return graphData;
  };

  const graphData = getGraphData(data);

  return (
    <div className="flex flex-row w-full px-8 items-center gap-x-8">
      <div>
        <Card className="border-none shadow-none rounded-3xl">
          <CardContent className="px-4 py-4 rounded-3xl bg-[#F1F9E7]">
            <RadioGroup
              defaultValue={current}
              className="flex flex-col justify-between"
              onValueChange={(value) => {
                setCurrent(value);
              }}
            >
              <div>
                <RadioGroupItem value="2F" id="2F" className="peer sr-only" />
                <Label
                  htmlFor="2F"
                  className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-center rounded-2xl w-[144px] p-2"
                >
                  <p className="text-18 font-normal">2F</p>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="1F" id="1F" className="peer sr-only" />
                <Label
                  htmlFor="1F"
                  className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-center rounded-2xl w-[144px] p-2"
                >
                  <p className="text-18 font-normal">1F</p>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="B1" id="B1" className="peer sr-only" />
                <Label
                  htmlFor="B1"
                  className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-center rounded-2xl w-[144px] p-2"
                >
                  <p className="text-18 font-normal">B1</p>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="B2" id="B2" className="peer sr-only" />
                <Label
                  htmlFor="B2"
                  className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-center rounded-2xl w-[144px] p-2"
                >
                  <p className="text-18 font-normal">B2</p>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      <Graph data={graphData} current={current} setSelected={setSelected} />
    </div>
  );
};

export default Reservation;