"use client";

import { Box, Flex, Heading, Spinner, Text } from "@/app/components/chakra";
import { useEffect } from "react";

import GROUPS from "@/app/config/groups";

export default function GroupPromoRedirect({
  slug,
  groupName,
}: {
  slug: string;
  groupName: string;
}) {
  useEffect(() => {
    if (slug in GROUPS) {
      const group = GROUPS[slug];
      window.location.replace(group?.auditionLink ?? "/");
      group.auditionLink &&
        typeof window !== "undefined" &&
        window?.gtag?.("event", "groupPromo", {
          event_category: "promo",
          event_label: slug,
        });
    } else {
      window.location.href = "/";
    }
  }, [slug]);

  return (
    <Box userSelect="none">
      <Heading as="h2" size="xl" w="100%" textAlign="center" mt="2">
        {groupName}
      </Heading>
      <Flex
        direction="column"
        w="100%"
        h="320px"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        gap="8"
      >
        <Spinner size="xl" color="#555" thickness="4px" />
        <Text fontSize="2xl" fontWeight="600">
          Loading&hellip;
        </Text>
      </Flex>
    </Box>
  );
}