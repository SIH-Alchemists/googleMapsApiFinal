import React from "react";
import Card from "./card";
const p1 = require("../images/1.jpg");
const p2 = require("../images/2.jpg");
const p4 = require("../images/4.jpg");
function News() {
  return (
    <>
      <div className="container  lg:pt-20 px-5 lg:px-24  ">
        <section className=" text-center">
          <h2 className="mt-5 mb-12 text-center text-3xl  text-[#f2c744] font-bold">
            Latest News
          </h2>

          <div className="grid gap-6  md:grid-cols-3 xl:gap-x-12">
            <Card
              imageUrl={p1}
              title="Floods in Assam"
              date="13.04.2023"
              author="hp"
              body=" These floods impact the northeastern state of Assam in India, displacing thousands of people and causing widespread damage to homes, crops, and infrastructure. The floods often lead to loss of lives and pose significant challenges for relief and recovery efforts."
            />
            <Card
              imageUrl={p2}
              title="Nepal Earthquake"
              date="16.02.2023"
              author="hp"
              body="Earthquakes in Nepal are devastating, with the most notable recent one being the 2023 Gorkha earthquake. This earthquake had a magnitude of 7.8 and caused widespread destruction, leading to loss of lives, homes, and cultural heritage sites."
            />
            <Card
              imageUrl={p4}
              title="Himachal Pradesh Avalanche"
              date="13.08.2023"
              author="hp"
              body="Himachal Pradesh, a state in northern India, experiences avalanches during the winter months, especially in the mountainous regions. Avalanches are rapid snowslides that can be triggered by various factors, including heavy snowfall and terrain conditions. These avalanches can pose a significant risk to local communities, travelers, and infrastructure. "
            />
          </div>
        </section>
      </div>
      ;
    </>
  );
}
export default News;
