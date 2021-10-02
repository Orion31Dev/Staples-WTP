import React from "react";
import "../../styles/components/unit/UnitVideos.scss";
import { IUnit, IVideo } from "./UnitData";

export default function UnitVideos(props: { unitData: IUnit }) {
  return (
    <div>
      <div className="videos">
        {props.unitData.videos.map(UnitVideo)}
      </div>
    </div>
  )
}

function UnitVideo(video: IVideo) {
  return (
    <a className="video" href={video.link}>{video.title}</a>
  )
}