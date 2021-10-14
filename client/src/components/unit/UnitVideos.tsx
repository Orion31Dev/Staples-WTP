import React from "react";
import { IUnit, IVideo } from "wtp-shared";

import "../../styles/components/unit/UnitVideos.scss";

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