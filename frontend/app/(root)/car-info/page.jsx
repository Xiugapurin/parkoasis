"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import { useRouter } from "next/navigation";
import useFetchCarInfo from "./useFetchCarInfo";

const CarInfo = () => {

  const router = useRouter();

  const {
    isLoading: isCarInfoLoading,
    error,
    plate,
    parkingSpaceId
  } = useFetchCarInfo();

  if (isCarInfoLoading) {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <div className="bg-slate-200 rounded-3xl text-20 font-normal h-full w-full flex justify-center items-center">
          發生錯誤，請稍後再試
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-y-5 lg:flex-row w-screen h-fit lg:gap-x-16 pt-28 lg:pt-32 px-8 lg:px-16 pb-8">
      <div className="flex flex-col w-full lg:w-fit justify-between">
        <div className="flex flex-col gap-y-5">
          <h2 className="text-24 p-3">停車查詢</h2>
          <Card variant="setting">
            <CardHeader>
              <CardTitle>停車資訊</CardTitle>
            </CardHeader>
            <CardContent>
              <p>車牌號碼: {plate}</p>
              <p>車位編號: {parkingSpaceId}</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center gap-x-3 px-16 py-8">
          <Button
            variant="setting"
            size="none"
            onClick={() => router.back()}
          >
            <p className="text-20">回上頁</p>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 justify-center items-start">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/images/car-info.png"
            fill={true}
            alt="Image"
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    </div>
  )
}

export default CarInfo