"use client";

import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { databases } from "@/lib/database/db";
import { PinContainer } from "./ui/Pin";
import { Models } from "appwrite";

// Extend the Appwrite Document type to include custom fields
interface Project extends Models.Document {
  title: string;
  des: string;
  img: string;
  iconLists: string[];
}

const RecentProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_DATABASE || "6622b79dc45ed9a3acca",
          process.env.NEXT_COLLECTION || "664e40c00025d1f47d8c"
        );
        const documents: Project[] = response.documents.map((doc) => ({
          ...doc,
          ID: doc.ID,
          title: doc.title,
          des: doc.des,
          img: doc.img,
          iconLists: doc.iconLists,
        }));
        setProjects(documents);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if(loading){
    return <p>Loading...</p>
  }
 

  return (
    <div className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.ID}
          >
            <PinContainer title="React" href="#">
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={
                    item.img
                  }
                  alt="cover"
                  className="z-10 absolute bottom-0"
                  onError={() => console.log(item.img)}
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <a href={item.link} target="_blank">
                    {" "}
                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                      Check Live Site
                    </p>
                  </a>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
