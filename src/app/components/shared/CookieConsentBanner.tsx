"use client";

import React, { useState, useEffect } from "react";

import { Button, Flex, Link, Text } from "@/app/components/chakra";

export default function CookieConsentBanner() {
  // User hasn't consented yet, but this is set for SSR purposes
  // (User will actually consent once page has rendered on client)
  const [consented, setConsented] = useState(true);

  useEffect(() => {
    function onStorage() {
      const consentedToCookies = localStorage.getItem("sac-cookie-consent");
      setConsented(
        // Parse localStorage if available
        parseLocalStorageValue(consentedToCookies)
      );
    }

    onStorage();

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return consented ? null : (
    <CookieConsentBannerContent setConsented={setConsented} />
  );
}

function CookieConsentBannerContent({
  setConsented,
}: {
  setConsented: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Flex
      gap={4}
      zIndex="100"
      position="fixed"
      bottom="0"
      w="100%"
      backgroundColor="#000a"
      color="#fff"
      minHeight="70px"
      p="4"
      alignItems="center"
      className="fadeOnce"
    >
      <Text flex={1}>
        We use cookies to improve your experience on our website. For more
        information, see our{" "}
        <Link fontWeight="600" href="/privacy">
          Privacy Policy
        </Link>
        .
      </Text>
      <Button
        variant="solid"
        size="md"
        onClick={() => {
          // Consent to cookies on click
          localStorage.setItem("sac-cookie-consent", "true");
          setConsented(true);
        }}
        colorScheme="blue"
      >
        Got it
      </Button>
    </Flex>
  );
}

function parseLocalStorageValue(value: string | null): boolean {
  return value === null ? false : JSON.parse(value);
}
