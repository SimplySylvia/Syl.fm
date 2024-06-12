import { useState, useEffect } from "react";

import SocketConnection from "@/services/socket";

interface SocketListenerReturn {
  listenerCount: number;
}

const useListenerCount = (socket_listener: string): SocketListenerReturn => {
  const [listenerCount, setListenerCount] = useState(0);

  useEffect(() => {
    SocketConnection.on(socket_listener, (count: number) => {
      setListenerCount(count);
    });
  }, [socket_listener]);

  return { listenerCount };
};

export default useListenerCount;
