'use client';

import Announcement from "../../components/Announcement";
import Card from "../../components/Card";
import Support from "../../components/Support";
import Todo from "../../components/Todo";
import Carousel from "../../components/Carousel";
import EnrollmentInfo from "@/app/components/EnrollmentInfo";
import { useRootContext } from "@/app/provider/RootProvider";

export default function Home() {
  const allDetails = useRootContext();
  console.log(allDetails);
  const { userDetails: { fname, lname, address, batchCode, city, coursecode, createdAt, dob, email, enrollmentNumber, fathername, gender, mothername, phone, pincode, state  } } = allDetails || { userDetails: { fname: '' , lname: '' , address: '' , batchCode: '' , city: '' , coursecode: '' , createdAt: '' , dob: '' , email: '' , enrollmentNumber: '' , fathername: '' , gender: '' , mothername: '' , phone: '' , pincode: '' , state: ''  } };
  const { batchDetails: { batchFullName, semester } } = allDetails || { batchDetails: { batchFullName: 'Batch Name', semester: "semester" } };

  return (
    <>
      <div className="flex text-sm max-[920px]:block">
        <div className="left">
          <Carousel />
          <div className="card2 mt-4">
            <h2 className="heading1">Semester {semester} - {batchFullName}</h2>
            <Card />
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
