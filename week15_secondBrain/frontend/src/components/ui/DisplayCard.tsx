import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { BACKEND_URL } from "../../config";

export function DisplayCard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getContent();
  }, []);

  async function getContent() {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        authorization: token,
      },
    });
    console.log(response.data.content);
    if (!response)
      alert(
        "Failed to load content Internal server error try logging out and relogin"
      );
    setCards((cards) => (cards = response.data.content));
    //@ts-ignore
    console.log(cards);
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {cards.map((cd: any, idx: number) => (
        <Card key={idx} title={cd.title} type={cd.type} link={cd.link} />
      ))}
    </div>
  );
}

{
  /* <Card
            type="Youtube"
            link="https://youtu.be/cdIs7VujZqs?si=xL1vETSqoIOxOpsf"
            title="kuch"
          />
          <Card
            type="twitter"
            link="https://x.com/tweet/status/1465053672593784834"
            title="kuch"
          /> */
}
