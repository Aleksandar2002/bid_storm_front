import { createContext, useEffect, useState, type ReactNode } from "react";
import * as signalR from "@microsoft/signalr";
import { BACK_BASE_URL } from "../../constants/paths";

type HubsContextType = {
  notificationsHub: signalR.HubConnection | null;
  auctionsHub: signalR.HubConnection | null;
};

const HubsContext = createContext<HubsContextType>({
  notificationsHub: null,
  auctionsHub: null,
});

export const HubsProvider = ({ children }: { children: ReactNode }) => {
  const [notificationsHub, setNotificationsHub] =
    useState<signalR.HubConnection | null>(null);
  const [auctionsHub, setAuctionsHub] = useState<signalR.HubConnection | null>(
    null,
  );
  useEffect(() => {
    const notificationsConnection = new signalR.HubConnectionBuilder()
      .withUrl(BACK_BASE_URL + "/notificationHub", { withCredentials: true })
      .withAutomaticReconnect()
      .build();
    const auctionsConnection = new signalR.HubConnectionBuilder()
      .withUrl(BACK_BASE_URL + "/auctionHub")
      .withAutomaticReconnect()
      .build();
    const startConnection = async () => {
      try {
        await notificationsConnection.start();
        await auctionsConnection.start();

        setNotificationsHub(notificationsConnection);
        setAuctionsHub(auctionsConnection);
      } catch (err) {
        console.log(err);
      }
    };
    startConnection();

    return () => {
      notificationsConnection.stop();
      auctionsConnection.stop();
    };
  }, []);

  return (
    <HubsContext.Provider value={{ auctionsHub, notificationsHub }}>
      {children}
    </HubsContext.Provider>
  );
};

export default HubsContext;
