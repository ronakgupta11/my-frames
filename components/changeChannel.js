"use client";

import * as React from "react";

import channels from "@/utils/channels.json"


import { Button } from 'flowbite-react';

export default function ChannelSwitch({ setChannel }) {
  return (
    <Button.Group>
     {channels.map((channel) => (
          <Button color={"gray"}
            key={channel.url}
          onClick={() =>
            setChannel(
              channel.url,
            )
          }
        >
            {channel.name}
          </Button>
           ))}
      
    </Button.Group>
  );
}
