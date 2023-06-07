import Announcement from "../components/Announcement";
import Card from "../components/Card";
import Support from "../components/Support";
import Todo from "../components/Todo";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <>
      <div className="flex text-sm max-[920px]:block">
        <div className="left">
          <Carousel />
          <div className="card2 mt-4">
            <h2 className="heading1">Semester 4 - Master of Computer Applications (Online Mode), July 2021</h2>
            <Card />
          </div>
        </div>
        <div className="right">
          <Announcement />
          <Support />
          <Todo />
        </div>
      </div>
    </>
  )
}
