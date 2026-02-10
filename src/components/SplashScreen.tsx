"use client";

import { Spinner } from "@heroui/spinner";

const SplashScreen = () => {
  return (
    <div id="splash" className="splash">
      <Spinner color="white" size="lg" />
    </div>
  );
};

export default SplashScreen;