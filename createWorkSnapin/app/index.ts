import fetch from "node-fetch";

import {
  AutomationEvent,
  AutomationInterface,
  AutomationMetadata,
} from "../sdk";

const API_BASE = "https://api.dev.devrev-eng.ai/";

export class App implements AutomationInterface {
  GetMetadata(): AutomationMetadata {
    return { name: "My Snap-in test", version: "0.1" };
  }

  async Run(events: AutomationEvent[]) {
    console.log("Running SnapIn test App - Create work on Devrev");
    console.log("All events");
    console.log(events);
    await this.SendMessage(events[0]);
  }

  async SendMessage(event: AutomationEvent) {
    console.log("Inside Send Slack Message");
    const SLACK_BOT_TOKEN =
      "xoxb-4556684165970-4941052917366-wVKLGuA8KGQvG9HHr2cTjRHC";

    const payload = {
      channel: "my-new",
      attachments: [
        {
          title: "Its deleted",
          text: "Its deleted the issue is deleted",
          author_name: "ItzNotMe",
          color: "#00FF00",
        },
      ],
    };

    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        Accept: "application/json",
      },
    })
      .then((res: any) => {
        console.log(res);
        console.log("Fetch Success");
        if (!res.ok) {
          console.log("Fetch Error 1");
          throw new Error(`Server error ${res.status}`);
        }

        return res.json();
      })
      .catch((error: any) => {
        console.log("Fetch Error");
        console.log(error);
      })
  }
}
