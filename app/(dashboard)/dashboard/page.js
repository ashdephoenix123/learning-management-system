'use client';

import Announcement from "../../components/Announcement";
import Card from "../../components/Card";
import Support from "../../components/Support";
import Todo from "../../components/Todo";
import Carousel from "../../components/Carousel";
import EnrollmentInfo from "@/app/components/EnrollmentInfo";
import { useRootContext } from "@/app/provider/RootProvider";
import { useEffect, useState } from "react";

export default function Home() {
  const allDetails = useRootContext();

  const [semesterDetails, setSemesterDetails] = useState({});
  const { userDetails: { createdAt } } = allDetails || { userDetails: { createdAt: '' } };
  const { batchDetails: { batchFullName, semester } } = allDetails || { batchDetails: { batchFullName: 'Batch Name', semester: "semester" } };
  const { courseDetails: { semesters, programInfo, weeklySchedule, courseMatrix } } = allDetails || { courseDetails: { semesters: [], programInfo: {}, weeklySchedule: [], courseMatrix:'' } };

  useEffect(() => {
    setSemesterDetails(() => {
      return semesters.filter((item) => item.semester === semester)[0];
    });
  }, [semester])

  console.log(allDetails)

  return (
    <>
      <div className="flex text-sm max-[920px]:block">
        <div className="left">
          <Carousel />
          <div className="card2 mt-4">
            <h2 className="heading1">Semester {semester} - {batchFullName}</h2>
            <Card subjectDetails={semesterDetails} />
          </div>
        </div>
        <div className="right">
          <EnrollmentInfo enrolledOn={createdAt} />
          <Announcement />
          <Support />
          <Todo />
        </div>
      </div>
    </>
  )
}
